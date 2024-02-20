# Python 3.10 image
FROM python:3.10-buster

RUN apt-get update && apt-get upgrade -y

# Install pip requirements.txt
COPY ../ /DL
WORKDIR /DL

RUN pip install -r requirements.txt
# Add to PATH
ENV PYTHONPATH="/DL:${PYTHONPATH}"

RUN python -m spacy download es_core_news_sm
