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
WebUI.comment(inputSearch)

WebUI.openBrowser('https://www.matahari.com/')

WebUI.callTestCase(findTestCase('Test Cases/Website/Matahari/Common Test Case/TP001-MatahariLogin'), 
	[('email') : email, ('password') : password])

// cari barang
WebUI.setText(findTestObject('Object Repository/Website Object/Matahari/Page_Main matahari.com/input_Search'), inputSearch)

WebUI.click(findTestObject('Object Repository/Website Object/Matahari/Page_Main matahari.com/button_Search'))

// pilih barang
WebUI.click(findTestObject('Object Repository/Website Object/Matahari/Page_Main matahari.com/img_Item'))

WebUI.click(findTestObject('Object Repository/Website Object/Matahari/Page_Yongki Komaladi Tassel Flat Shoes Wanita  matahari.com/div_38'))

WebUI.click(findTestObject('Object Repository/Website Object/Matahari/Page_Yongki Komaladi Tassel Flat Shoes Wanita  matahari.com/button_Tambah Ke Keranjang'))

// lihat keranjang
WebUI.click(findTestObject('Object Repository/Website Object/Matahari/Page_Yongki Komaladi Tassel Flat Shoes Wanita  matahari.com/a_Lihat Keranjang'))

//WebUI.closeBrowser()