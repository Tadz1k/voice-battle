import sys, wave, struct
def main(argv):
    soundName = argv[0]
    print(soundName)
    wavefile = wave.open('static/sounds/vignesh.wav', 'r')
    
    #length = wavefile.getnframes()
    #for i in range(0, length):
     #   wavedata = wavefile.readframes(1)
      #  data = struct.unpack("<h", wavedata)
       # print(int(data[0]))


if __name__ == "__main__":
    main(sys.argv[1:])