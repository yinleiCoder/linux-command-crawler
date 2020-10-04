
# word转pdf
# from win32com.client import gencache
from win32com.client import constants, gencache

def wordToPdf(wordPath, pdfPath):
    word = gencache.EnsureDispatch('Word.Application')
    doc = word.Documents.Open(wordPath, ReadOnly=1)
    doc.ExportAsFixedFormat(pdfPath,
                            constants.wdExportFormatPDF,
                            Item=constants.wdExportDocumentWithMarkup,
                            CreateBookmarks=constants.wdExportCreateHeadingBookmarks)
    word.Quit(constants.wdDoNotSaveChanges)

wordToPdf('C:\\Users\\10991\\Desktop\\1.docx','C:\\Users\\10991\\Desktop\\2.pdf')
