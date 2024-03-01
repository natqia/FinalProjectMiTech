import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testng.keyword.TestNGBuiltinKeywords as TestNGKW
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

def dataLogin = findTestData('Data Files/dataLogin')
def email = dataLogin.getObjectValue('Email', 1)
def password = dataLogin.getObjectValue('Password', 1)
def inputSearch = dataLogin.getObjectValue('Input Search Bar', 1)

WebUI.comment(email)
WebUI.comment(password)

WebUI.openBrowser(GlobalVariable.baseURL)

if(WebUI.verifyElementPresent(findTestObject('Object Repository/Website Object/Bro.Do/Page_Main BRODO Store/label_Inovasi Terbaru Brodo'), 5, FailureHandling.STOP_ON_FAILURE))
	WebUI.comment("Sudah berada di halaman utama")

WebUI.callTestCase(findTestCase('Test Cases/Website/Bro.Do/Common Test Case/TP002-BrodoLogin'), 
	[('email') : email, ('password') : password])



// cari barang
WebUI.click(findTestObject('Object Repository/Website Object/Bro.Do/Page_Main BRODO Store/icon_Search'))

WebUI.setText(findTestObject('Object Repository/Website Object/Bro.Do/Page_Main BRODO Store/input_Search'), inputSearch)

WebUI.click(findTestObject('Object Repository/Website Object/Bro.Do/Page_Main BRODO Store/icon_To Search'))

// pilih barang
WebUI.click(findTestObject('Object Repository/Website Object/Bro.Do/Page_Search 17 results found for Flat Shoes  Brodo/item_VTG V.2 LO Black OW'))
// add to cart
WebUI.click(findTestObject('Object Repository/Website Object/Bro.Do/Page_VTG V.2 LO Black OW/button_Add To Cart'))


// lihat keranjang
//WebUI.click(findTestObject('Object Repository/Website Object/Matahari/Page_Yongki Komaladi Tassel Flat Shoes Wanita  matahari.com/a_Lihat Keranjang'))

//WebUI.closeBrowser()