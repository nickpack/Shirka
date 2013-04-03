group { 'puppet':
  ensure => present,
}

exec { 'apt-get update': 
  command => '/usr/bin/apt-get update',
}

package { 'curl':
  ensure => present,
  require => Exec['apt-get update'],
}

package { 'software-properties-common':
  ensure => present,
  require => Exec['apt-get update'],
}

package { 'python-software-properties':
  ensure => present,
  require => Exec['apt-get update'],
}

package { 'ruby1.9.3':
  ensure => present,
  require => Exec['apt-get update'],
}

package { 'nginx': 
  ensure => present,
  require => Exec['apt-get update'],
}

package { 'build-essential': 
  ensure => present,
  require => Exec['apt-get update'],
}

package { 'git-core': 
  ensure => present,
  require => Exec['apt-get update'],
}

exec { 'add node repo':
  command => '/usr/bin/apt-add-repository ppa:chris-lea/node.js && /usr/bin/apt-get update',
  require => Package['python-software-properties'],
}

package { 'nodejs': 
  ensure => latest,
  require => [Exec['apt-get update'], Exec['add node repo']],
}

exec { 'npm':
  command => '/usr/bin/curl https://npmjs.org/install.sh | /bin/sh',
  require => [Package['nodejs'], Package['curl']],
  environment => 'clean=yes',
}

exec { 'gem install sass': 
  command => '/usr/bin/gem install sass',
  require => Package['ruby1.9.3'],
}

exec { 'node-modules symlink': 
  command => '/bin/rm -rfv /usr/local/node_modules && /bin/rm -rfv /vagrant/node_modules && /bin/mkdir /usr/local/node_modules && /bin/ln -s /usr/local/node_modules /vagrant/node_modules ',
}

exec { 'npm install -g grunt-cli bower':,
  command => '/usr/bin/npm install -g grunt-cli bower',
  require => Exec['npm'],
}

exec { 'npm-packages':,
  command => '/usr/bin/npm install',
  require => [Exec['npm install -g grunt-cli bower'], Exec['node-modules symlink']],
  cwd => '/vagrant',
}

service { 'nginx':
  ensure => running,
  require => Package['nginx'],
}

file { 'nginx-conf':
  path => '/etc/nginx/nginx.conf',
  ensure => file,
  replace => true,
  require => Package['nginx'],
  source => 'puppet:///modules/nginx/nginx.conf',
  notify => Service['nginx'],
}

file { 'vagrant-nginx':
  path => '/etc/nginx/sites-available/vhost.conf',
  ensure => file,
  replace => true,
  require => Package['nginx'],
  source => 'puppet:///modules/nginx/vhost.conf',
  notify => Service['nginx'],
}

file { 'default-nginx-disable':
  path => '/etc/nginx/sites-enabled/default',
  ensure => absent,
  require => Package['nginx'],
}

file { 'vagrant-nginx-enable':
  path => '/etc/nginx/sites-enabled/vhost.conf',
  target => '/etc/nginx/sites-available/vhost.conf',
  ensure => link,
  notify => Service['nginx'],
  require => [
    File['vagrant-nginx'],
    File['default-nginx-disable'],
  ],
}

file { "/var/www/":
    ensure => link,
    target => "/vagrant",
}