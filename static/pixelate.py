#!/usr/bin/env python
import sys
from PIL import Image

im = Image.open(sys.argv[1])
w, h = im.size
new_w = 32
new_h = int(h * (32./w))

im = im.resize((new_w, new_h), resample=Image.BICUBIC)
im = im.resize((w, h), resample=Image.NEAREST)

im.save('{}_pixelated.png'.format(sys.argv[1][:-4]))
