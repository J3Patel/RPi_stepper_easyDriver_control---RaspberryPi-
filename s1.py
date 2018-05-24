import RPi.GPIO as GPIO, time
import sys

GPIO.setmode(GPIO.BOARD)
GPIO.setup(16, GPIO.OUT)
GPIO.setup(18, GPIO.OUT)

p = GPIO.PWM(16, 7000)

def SpinMotor(dire):
    p.ChangeFrequency(7000)
    GPIO.output(18,dire)
    p.start(1)
    time.sleep(0.01)
    return True
while True:
    dir_input = raw_input("Enter your dir: ") 
    if dir_input == "F":
        SpinMotor(True)
    elif dir_input == "B":
        SpinMotor(False)
    elif dir_input == "stop":
        p.stop()  
        dir_input = ""  
    elif dir_input == "shutdown":
        p.stop()
        GPIO.cleanup()
        break
