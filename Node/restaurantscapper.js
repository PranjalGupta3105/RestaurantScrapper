const { Builder, By, Key, until } = require('selenium-webdriver');
const dbConnection = require('./mongoconnector');
const restroModel = require('./restroModel');
// const DataGrabber = require('./dataGrabber');
// const dataGrabberObject = new DataGrabber();
// const XLSX = require('xlsx');
// const restroFilePath = 'Book1.xlsx';

const timeout = 60 * 1000;

// //dataGrabberObject.getDataFromFile();

// const workBook = XLSX.readFile(restroFilePath);
// const sheetNames = workBook.SheetNames;
// console.log(sheetNames);

// var data = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
// console.log(data);

async function getRestaurantData(restaurantName, n) {
    // return new Promise((resolve, reject) => {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            console.log('----------------------------------------------');
            console.log('Restaurant Name : ' + restaurantName);

            // Go to maps.google.com URL
            await driver.get('https://maps.google.com');

            // https://www.google.com/maps/search/Chuy's/@28.6102497,77.3602831,16z/data=!3m1!4b1

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
                console.log('Search Element Not found');
                console.log(er);
            });

            console.log('-------------------Scrapped Restaurant Details-------------------' + '\n');
            
            // Grab the Description HTML element
            driver.wait(until.elementLocated(
                By.xpath('//*[@id="pane"]/div/div[1]/div/div/jsl/button/div/div[1]/div[1]')), timeout
            ).then(descriptionElement => {
                return descriptionElement.getText().then((value) => {
                    let descriptionData = value;
                    if (value == '') {
                        console.log('Description : ', '');
                        restroModel.findOneAndUpdate({name: restaurantName},{description: 'No Description Available'},(err, result)=>{
                            if(err){
                                console.log('Unable to add the description in db');
                            }else{
                                console.log('Description updated in DB');
                            }
                        });

                    } else {
                        console.log('Description : ', descriptionData);
                        restroModel.findOneAndUpdate({name: restaurantName},{description: descriptionData},(err, result)=>{
                            if(err){
                                console.log('Unable to add the description in db');
                            }else{
                                console.log('Description updated in DB');
                            }
                        });
                        // const workBook = XLSX.readFile('Book1.xlsx');
                        // const sheetNames = workBook.SheetNames;
                        // let worksheet = workBook.Sheets[sheetNames[0]];
                        // let columnname = 'C' + n.toString();
                        // console.log(columnname);
                        // if (worksheet[columnname] == undefined) {
                        //     console.log('cell not defined');

                        // } else {
                        //     console.log('Cell defined');

                        //     let cell = worksheet[columnname].v;
                        //     console.log(cell)

                        //     // modify value in D4
                        //     worksheet[columnname].v = descriptionData;

                        //     // write to new file
                        //     XLSX.writeFile(workBook, 'Book1.xlsx');
                        // -----------------------------------------------------
                        // restroModel.findOneAndUpdate({name: restaurantName},{description:descriptionData},(err, result)=>{
                        //     if(err){
                        //         console.log('DB Error'+err);

                        //     }else{
                        //         console.log(result);
                        //     }
                        // });

                    }
                }).catch((textNotFound) => {
                    console.log('Description : ', 'Not Available');
                });
            }).catch((er) => {
                console.log('Error getting the pricing element');
            });

            // Grab the Price Range HTML element
            driver.wait(until.elementLocated(
                By.xpath('//*[@id="pane"]/div/div[1]/div/div/div[2]/div[1]/div[2]/div/div[1]/span[2]/span/span[2]/span[2]/span[1]/span')),
                timeout
            ).then(priceElement => {
                return priceElement.getText().then((value) => {
                    let priceData = value;
                    if (value == '') {
                        console.log('Price : ', 'Not Available');
                    } else {
                        console.log('Price : ', priceData);
                        restroModel.findOneAndUpdate({name: restaurantName},{pricing: priceData},(err, result)=>{
                            if(err){
                                console.log('Unable to add the pricing in db');
                            }else{
                                console.log('Pricing updated in DB');
                            }
                        });
                    }
                }).catch((textNotFound) => {
                    console.log('Price : ', 'Not Available');
                });
            }).catch((er) => {
                console.log('Error getting the pricing element');
            });

            // Grab the Category HTML element
            driver.wait(until.elementLocated(
                By.xpath('//*[@id="pane"]/div/div[1]/div/div/jsl/button/div/div[1]/div[2]')),
                timeout
            ).then(categoryElement => {
                return categoryElement.getText().then((value) => {
                    let categoryData = value.split(' ')[0];
                    console.log('Category : ', categoryData);
                    restroModel.findOneAndUpdate({name: restaurantName},{category: categoryData},(err, result)=>{
                        if(err){
                            console.log('Unable to add the category in db');
                        }else{
                            console.log('Category updated in DB');
                        }
                    });
                }).catch((textNotFound) => {
                    console.log('Category : ', 'Not Available');
                });
            }).catch((er) => {
                console.log('Error getting the category element');
            });

            // Grab the Time HTML element
            driver.wait(until.elementLocated(
                By.xpath('/html/body/jsl/div[3]/div[9]/div[9]/div/div[1]/div/div/div[12]/div[1]/span[1]/img')),
                // //*[@id="pane"]/div/div[1]/div/div/div[13]/div[1]
                // /html/body/jsl/div[3]/div[9]/div[9]/div/div[1]/div/div/div[12]/div[1]/span[2]/span[2]
                timeout

            ).then(restroClockElement => {
                if (restroClockElement != '') {
                    driver.wait(until.elementLocated(
                        By.xpath('/html/body/jsl/div[3]/div[9]/div[9]/div/div[1]/div/div/div[12]/div[1]/span[2]')),
                        // //*[@id="pane"]/div/div[1]/div/div/div[13]/div[1]
                        // /html/body/jsl/div[3]/div[9]/div[9]/div/div[1]/div/div/div[12]/div[1]/span[2]/span[2]
                        timeout
                    ).then(restroTimingElement => {
                        return restroTimingElement.getText().then((value) => {
                            let timingData = value;
                            if (timingData == '') {
                                console.log('Timing : ', 'Not Available');
                            } else {
                                if (timingData.includes("am") || timingData.includes("pm")) {
                                    console.log('Timing : ', timingData);
                                    restroModel.findOneAndUpdate({name: restaurantName},{timing: timingData},(err, result)=>{
                                        if(err){
                                            console.log('Unable to add the timing in db');
                                        }else{
                                            console.log('Timing updated in DB');
                                        }
                                    });

                                } else {
                                    console.log('Timing : ', 'Not Available');
                                }
                            }
                        }).catch((textNotFound) => {
                            console.log('Timing : ', 'Not Available');
                        });
                    }).catch((er) => {
                        console.log('Error getting the timing element');
                    });
                } else {
                    console.log('Clock Element : ', 'Not Available');
                }
            }).catch((er) => {
                console.log('Error getting the clock element');
            });

            await sleep(60 * 1 * 1000);

            driver.quit();

            //await sleep(60 * 0.5 * 1000);
        } catch (ex) {
            console.log('Unable to build the browser instance');
            // console.log('Exception Occured', ex);
        }
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

async function getRestaurantsFromDB() {
    return new Promise((resolve, reject) => {
        restroModel.find({}, { name: 1, _id: 0 }, (err, restroResult) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                console.log('Restaurants details Datatype :' + typeof (restroResult));
                // console.log(restroResult);
                resolve(restroResult)

            }
        });


    })

    // });
}


async function callOperation() {

    await getRestaurantsFromDB().then(async (result) => {
        // Initializing Restaurant Scrapping Process
        console.log('\n' + 'Initializing Scrapping...' + '\n');
        for (i = 0; i < result.length; i++) {
            // console.log(data[i].Restaurant);
            await getRestaurantData(result[i].name, i);
            await sleep(60 * 0.5 * 1000);
            console.log(result[i].name);
        }
    }).catch((err)=>{
        console.log('Error Occured'+err);
        
    })



    console.log('------------ Scrapping END -------------');
}

callOperation()