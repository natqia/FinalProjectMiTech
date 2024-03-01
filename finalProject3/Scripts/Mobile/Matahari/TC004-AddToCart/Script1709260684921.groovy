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

//def dataLogin = findTestData('Data Files/dataLogin')
//def email = dataLogin.getObjectValue('Email', 2)
//def password = dataLogin.getObjectValue('Password', 2)
//WebUI.comment(password)

Mobile.startApplication('D:\\.MiTechBootcamp\\FinalProject\\finalProject3\\Resource\\matahari-mobile.apk', true)

// taskbar User
Mobile.tap(findTestObject('Object Repository/Mobile Object/Matahari Object/android.view.ViewGroup'), 0)

Mobile.scrollToText('KELUAR')

Mobile.tap(findTestObject('Object Repository/Mobile Object/Matahari Object/android.view.ViewGroup (5)'), 0)

// button login
Mobile.tap(findTestObject('Object Repository/Mobile Object/Matahari Object/android.view.ViewGroup (1)'), 0)

//login
Mobile.setText(findTestObject('Object Repository/Mobile Object/Matahari Object/android.widget.EditText - Nomor Handphone  Email'), 'nlinaatqia@gmail.com', 
    0)

Mobile.setEncryptedText(findTestObject('Object Repository/Mobile Object/Matahari Object/android.widget.EditText - Password (minimal 8 karakter)'), 
    'WSmJuFV16eUFrlXGuZtLcw==', 0)

Mobile.pressBack()

Mobile.tap(findTestObject('Object Repository/Mobile Object/Matahari Object/android.view.ViewGroup (2)'), 0)

Mobile.tap(findTestObject('Object Repository/Mobile Object/Matahari Object/android.view.ViewGroup (3)'), 0)

Mobile.tap(findTestObject('Object Repository/Mobile Object/Matahari Object/android.widget.TextView - Wanita'), 0)

Mobile.tap(findTestObject('Object Repository/Mobile Object/Matahari Object/android.widget.ImageView'), 0)

Mobile.tap(findTestObject('Object Repository/Mobile Object/Matahari Object/android.widget.ImageView (1)'), 0)

Mobile.tap(findTestObject('Object Repository/Mobile Object/Matahari Object/android.view.ViewGroup (4)'), 0)

Mobile.tap(findTestObject('Object Repository/Mobile Object/Matahari Object/android.view.ViewGroup (6)'), 0)

Mobile.tap(findTestObject('Object Repository/Mobile Object/Matahari Object/android.view.ViewGroup (7)'), 0)

Mobile.tap(findTestObject('Object Repository/Mobile Object/Matahari Object/android.view.ViewGroup (8)'), 0)

Mobile.takeScreenshot('D:\\.MiTechBootcamp\\FinalProject\\finalProject3\\Resource\\screenshot.png')

Mobile.closeApplication()

