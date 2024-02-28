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
import com.kms.katalon.entity.global.GlobalVariableEntity

import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

WebUI.openBrowser(GlobalVariable.siteURL)

final String username = 'coba123!$%^&'
final String password = 'passwordcoba123!$%^&'

WebUI.callTestCase(findTestCase('Test Cases/Common Test Case/login'), 
	[('Username') : username, ('Password') : password], 
	FailureHandling.STOP_ON_FAILURE
	)
	
if(WebUI.verifyElementPresent(findTestObject('Object Repository/Page_ACME demo app/buttonAddAccount'), 5, FailureHandling.STOP_ON_FAILURE))
	WebUI.comment('Berhasil login dan object buttonAddAccount ditemukan')

if(WebUI.verifyElementPresent(findTestObject('Object Repository/Page_ACME demo app/buttonMakePayment'), 5, FailureHandling.STOP_ON_FAILURE))
	WebUI.comment('Berhasil login dan object buttonMakeAppoinment ditemukan')
	
if(WebUI.verifyElementPresent(findTestObject('Object Repository/Page_ACME demo app/labelFinancialOverview'), 5, FailureHandling.STOP_ON_FAILURE))
	WebUI.comment('Berhasil login dan object labelFinancialOverview ditemukan')
	
if(WebUI.verifyElementPresent(findTestObject('Object Repository/Page_ACME demo app/labelRecentTransactions'), 5, FailureHandling.STOP_ON_FAILURE))
	WebUI.comment('Berhasil login dan object labelRecentTransactions ditemukan')
	
WebUI.closeBrowser()