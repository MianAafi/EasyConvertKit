import sys
from pdf2docx import Converter,parse
fileLocation=sys.argv[1]
outputLocation=sys.argv[2]

pdffile= fileLocation
word = outputLocation

cv=Converter(pdffile)
cv.convert(word,start=0 ,end=None)
cv.close


