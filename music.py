from urllib.request import urlretrieve
import sys
import wave
import urllib2

def main(argv):
    url = argv[0]
    hash = argv[1]
    photo_name = (f'{hash}_recorded.png')
    sound_name = (f'{hash}_recorded.wav')
    recorded_voices_dir = 'static/recorded_voices'
    
    wavfile = wave.Wave_write.writeframes(url)

    print('Zapisano')



if __name__ == "__main__":
    main(sys.argv[1:])