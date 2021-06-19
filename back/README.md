# How to run
```
python main.py
```
service is on port 5000
# How to build
```
docker build -t antoinenguyen31/retex-api:latest .
docker build -t antoinenguyen31/retex-api:latest-arm .
```
# How to run in docker mode
```
docker run -d -p 5000:5000 etangdesapplis/retex:back-20201011
docker run -d -p 5000:5000 etangdesapplis/retex:back-20201011-arm
```
