import sys
import fitz
fileLocation=sys.argv[1]
outputLocation=sys.argv[2]


direction=sys.argv[3]
inputPdf= fileLocation
saveLocation= outputLocation
pdf=fitz.open(inputPdf)
pdf2=fitz.open()
pdf2.insert_pdf(pdf,rotate=int(direction))
pdf2.save(saveLocation)
