from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Open the maps.google.com with current latitude and longitude
url = 'https://maps.google.com'

driver = webdriver.Chrome()
driver.get(url)
driver.find_element_by_xpath('//*[@id="searchboxinput"]').send_keys('burger king')
driver.find_element_by_xpath('//*[@id="searchbox-searchbutton"]').click()
element = WebDriverWait(driver, 60).until(
    EC.presence_of_element_located((By.XPATH, 
    '//*[@id="pane"]/div/div[1]/div/div/div[2]/div[1]/div[1]'))
)
element.click()


descriptionElement = WebDriverWait(driver, 60).until(
    EC.presence_of_element_located((By.XPATH,'//*[@id="pane"]/div/div[1]/div/div/jsl/button/div/div[1]/div[1]'))
)
restaurantDescription = descriptionElement.text.encode('ascii','ignore')

priceElement = WebDriverWait(driver, 60).until(
    EC.presence_of_all_elements_located((By.XPATH,'//*[@id="pane"]/div/div[1]/div/div/div[2]/div[1]/div[2]/div/div[1]/span[2]/span/span[2]/span[2]/span[1]/span'))
)
restaurantPrice = priceElement[0].get_attribute('aria-label')
print(priceElement[0].text.encode('ascii','ignore'))


restaurantCategoryElement = WebDriverWait(driver, 60).until(
    EC.presence_of_all_elements_located((By.XPATH,'//*[@id="pane"]/div/div[1]/div/div/jsl/button/div/div[1]/div[2]'))
)
restaurantCategoryInfo = restaurantCategoryElement[0].text.encode('ascii','ignore')


print('Restaurant Description',restaurantDescription)
print('Restaurant Price',restaurantPrice)
print('Restaurant Category',restaurantCategoryInfo)
