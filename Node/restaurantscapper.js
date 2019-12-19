const { Builder, By, Key, until } = require('selenium-webdriver');
const timeout = 60 * 1000;


async function getRestaurantData(restaurantName) {
    let driver = await new Builder().forBrowser('chrome').build();

    try {

        // Go to maps.google.com URL
        await driver.get('https://maps.google.com');

        // Find the search input field and to the field fill the search param as Restaurant Name
        await driver.findElement(By.xpath('//*[@id="searchboxinput"]')).sendKeys(restaurantName);

        // Click the search button with the searched field filled-in 
        await driver.findElement(By.xpath('//*[@id="searchbox-searchbutton"]')).click();

        // Click on the first result thus obtained after the search to grab the details
        driver.wait(until.elementLocated(
            By.xpath('//*[@id="pane"]/div/div[1]/div/div/div[2]/div[1]/div[1]')), timeout
        ).then(searchElement => {
            return searchElement.click();
        }).catch((er) => {
            console.log(er);
        });

        // Grab the Description HTML element
        driver.wait(until.elementLocated(
            By.xpath('//*[@id="pane"]/div/div[1]/div/div/jsl/button/div/div[1]/div[1]')), timeout
        ).then(descriptionElement => {
            return descriptionElement.getText().then((value) => {
                let descriptionData = value;
                console.log('Description : ', descriptionData);
            }).catch((textNotFound) => {
                console.log(textNotFound);
            });
        }).catch((er) => {
            console.log(er);
        });

        // Grab the Price Range HTML element
        driver.wait(until.elementLocated(
            By.xpath('//*[@id="pane"]/div/div[1]/div/div/div[2]/div[1]/div[2]/div/div[1]/span[2]/span/span[2]/span[2]/span[1]/span')),
            timeout
        ).then(priceElement => {
            return priceElement.getText().then((value) => {
                let priceData = value;
                console.log('Price : ', priceData);
            }).catch((textNotFound) => {
                console.log(textNotFound);
            });
        }).catch((er) => {
            console.log(er);
        });

        // Grab the Category HTML element
        driver.wait(until.elementLocated(
            By.xpath('//*[@id="pane"]/div/div[1]/div/div/jsl/button/div/div[1]/div[2]')),
            timeout
        ).then(categoryElement => {
            return categoryElement.getText().then((value) => {
                let categoryData = value.split(' ')[0];
                console.log('Category : ', categoryData);
            }).catch((textNotFound) => {
                console.log(textNotFound);
            });
        }).catch((er) => {
            console.log(er);
        });

        // Grab the Time HTML element
        driver.wait(until.elementLocated(
            By.xpath('//*[@id="pane"]/div/div[1]/div/div/div[12]/div[1]/span[2]/span[2]')),
            timeout
        ).then(restroTimingElement => {
            // console.log(restroTimingElement);
           
                return restroTimingElement.getText().then((value) => {
                    let timingData = value;
                    if (timingData == '') {
                        console.log('Timing : ', 'Not Available');
                    } else {
                        console.log('Timing : ', timingData);
                    }
                }).catch((textNotFound) => {
                    console.log(textNotFound);
                });

        }).catch ((er) => {
                    console.log('Time not found');
    });

    // -------- Verify Code --------

    // console.log('Restaurant Final Details');






} catch (ex) {
    console.log('Exception Occured', ex);
}
    // finally{
    //     await driver.quit();
    // }
}

getRestaurantData('burger king');
