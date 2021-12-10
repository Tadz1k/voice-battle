import sys, wave, struct
import matplotlib.pyplot as plt
from scipy.io import wavfile

def main(argv):
    sounds_folder = 'static/sounds'
    images_folder = 'static/game_images'
    sound_name = argv[0]
    image_name = argv[1]
    wavefile = wave.open(f'{sounds_folder}/{sound_name}', 'r')
    if argv[1] != 'duration':
        outString = ''
        length = wavefile.getnframes()
        for i in range(0, length):
            wavedata = wavefile.readframes(1)
            data = struct.unpack("<h", wavedata)
            outString = f'{outString} {data[0]}'
        fs, Audiodata = wavfile.read(f'{sounds_folder}/{sound_name}')
        plt.plot(Audiodata)
        plt.savefig(f'{images_folder}/{image_name}.png')
        print(outString)
    if argv[1] == 'duration':
        samplerate, data = wavfile.read(f'{sounds_folder}/{sound_name}')
        length = round(round((data.shape[0] / samplerate),4)*1000);
        print(f"{length}")
    


if __name__ == "__main__":
    main(sys.argv[1:])