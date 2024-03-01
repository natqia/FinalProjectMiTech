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

Mobile.startApplication('D:\\.MiTechBootcamp\\FinalProject\\finalProject3\\Resource\\Brodo_4.1_apkcombo.com.apk', true)

// wait
Mobile.delay(5)

// click Menu
Mobile.tap(findTestObject('Object Repository/Mobile Object/Brodo Object/button_Menu'), 0)
// click ACCOUNT button
Mobile.tap(findTestObject('Object Repository/Mobile Object/Brodo Object/button_Menu ACCOUNT'), 0)
// input email from Data File
Mobile.setText(findTestObject('Object Repository/Mobile Object/Brodo Object/input_Email'), email, 
    0)

Mobile.pressBack()
// input email from Data File
Mobile.setText(findTestObject('Object Repository/Mobile Object/Brodo Object/input_Password'), password, 
    0)
// click Masuk button
Mobile.tap(findTestObject('Object Repository/Mobile Object/Brodo Object/button_Masuk'), 0)
// click Menu
Mobile.tap(findTestObject('Object Repository/Mobile Object/Brodo Object/button_Menu'), 0)
// go to HOME
Mobile.tap(findTestObject('Object Repository/Mobile Object/Brodo Object/button_Menu HOME'), 0)
// wait
Mobile.delay(5)
// click item
Mobile.tap(findTestObject('Object Repository/Mobile Object/Brodo Object/text_Corsa Classic White Navy'), 0)
// choose size
Mobile.tap(findTestObject('Object Repository/Mobile Object/Brodo Object/button_Pilih Ukuran'), 0)
// 42
Mobile.tap(findTestObject('Object Repository/Mobile Object/Brodo Object/button_42'), 0)
// add item to cart
Mobile.tap(findTestObject('Object Repository/Mobile Object/Brodo Object/button_TAMBAH KE TAS'), 0)
// wait
Mobile.delay(5)
// close aplication
Mobile.closeApplication()

