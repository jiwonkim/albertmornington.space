# Start from scratch
sudo start albertmornington
sudo service nginx restart

# Reload
sudo service albertmornington reload

# Tail uwsgi log
tail -f /var/log/uwsgi/albertmornington.log

# Pixelate images
`find . -ipath './<directory_name>/1000*.jpg' -exec ./pixelate.py {} \;` inside /static
