import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

SMTP_SERVER = "localhost"
SMTP_PORT = 1025
SENDER_EMAIL = 'homelyservices@mail.com'
SENDER_PASSWORD = ''

def send_email(to,subject,content):
     
     msg =MIMEMultipart()
     msg['TO'] = to
     msg['SUBJECT'] = subject
     msg['From'] = SENDER_EMAIL

     msg.attach(MIMEText(content,'html'))
       
     with smtplib.SMTP(host=SMTP_SERVER , port=SMTP_PORT) as client:
        client.send_message(msg)
        client.quit()  
   