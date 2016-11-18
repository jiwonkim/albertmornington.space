# Start from scratch
sudo start albertmornington
sudo service nginx restart

# Reload
sudo service albertmornington reload

# Tail uwsgi log
tail -f /var/log/uwsgi/albertmornington.log
