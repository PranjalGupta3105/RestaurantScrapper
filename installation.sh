sudo apt-get update
sudo apt-get install build-essential checkinstall
sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev

cd /usr/src
sudo wget https://www.python.org/ftp/python/2.7.16/Python-2.7.16.tgz

sudo tar xzf Python-2.7.16.tgz

cd Python-2.7.16
sudo ./configure --enable-optimizations
sudo make altinstall

python2.7 -V
pip -V


sudo wget https://chromedriver.storage.googleapis.com/79.0.3945.36/chromedriver_linux64.zip
sudo apt-get install unzip
sudo unzip chromedriver_linux64.zip
cd chromedriver_linux64
sudo cp chromedriver.exe /usr/src/Python-2.7.16/chromedriver.exe

cd /usr/src
sudo pip install selenium



