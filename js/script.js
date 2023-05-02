const weatherRequestForm = document.querySelector('.weather-request-form');
const amountDaysValues = document.querySelector('.amount-of-days-values');
const inputSearchCity = document.querySelector('.weather-request-form__input-search-city');
const inputButton = document.querySelector('.weather-request-form__button');

const weather = document.querySelector('.weather')
console.log(weather);

// const requestURL = 'http://api.weatherapi.com/v1/forecast.json';
// const apiKey = 'a1fc4c4b7e8f4807ac085018232004';

// const xhr = new XMLHttpRequest();

// xhr.open('GET',
//     `${requestURL}?key=${apiKey}
// ${requestParameter('q', 'zaporizhzhya')}
// ${requestParameter('days', '3')}
// ${requestParameter('lang', 'uk')}`);

// xhr.onload = () => {
//     if (xhr.status >= 400) {
//         console.error(xhr.response)
//     } else {
//         console.log(JSON.parse(xhr.response));


//         let x = JSON.parse(xhr.response);
//         console.log(x.current.temp_c);
//     }
// }

// xhr.send()

function requestParameter(kay, value) {
    return `&${kay}=${value}`
}

function sumbit() {
    const inputSityValue = inputSearchCity.value
    const requestURL = 'https://api.weatherapi.com/v1/forecast.json';
    const apiKey = 'a1fc4c4b7e8f4807ac085018232004';

    const xhr = new XMLHttpRequest();

    xhr.open('GET',
        `   ${requestURL}?key=${apiKey}
            ${requestParameter('q', `${inputSityValue}`)}
            ${requestParameter('days', `${amountDaysValues.value}`)}
            ${requestParameter('lang', 'uk')}
        `);

    xhr.onload = () => {
        if (xhr.status >= 400) {
            console.error(xhr.response)
        } else {
            console.log(JSON.parse(xhr.response));

            if (document.querySelectorAll('.weather-day').length !== 0) {
                document.querySelectorAll('.weather-day').forEach(el => el.remove())
            }

            const data = JSON.parse(xhr.response);
            console.log(data.current.temp_c);

            let x = data.forecast.forecastday[0].date;
            let y = new Date(x);
            const namesDaysWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
            const monthNames = ['Янрарья', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
            console.log(namesDaysWeek[y.getDay()]);
            console.log(y.getDate());
            console.log(monthNames[y.getMonth()]);



            // weather.classList.add('weather_display-block');

            // let location = document.createElement('p');
            // location.className = 'weather__location';
            // location.innerHTML = data.location.name;
            // weather.append(location);

            // let tempC = document.createElement('p');
            // tempC.className = 'weather__temp-c';
            // tempC.innerHTML = `Температура, °C: ${data.current.temp_c}`;
            // weather.append(tempC);

            // тест

            const weatherTable = document.querySelector('.weather-table');
            const weatherDays = document.querySelector('.weather-data__days');

            // test
            const headerContainer = document.querySelector('.header__container');
            const weatherRequestForm = document.querySelector('.weather-request-form');
            const weatherData = document.querySelector('.weather__weather-data.weather-data')
            weatherRequestForm.className = 'header__weather-request-form weather-request-form'
            headerContainer.append(weatherRequestForm)

            if (weatherData.className !== 'weather__weather-data weather-data weather__weather-data_d-flex') {
                weatherData.className = `${weatherData.className} weather__weather-data_d-flex`;
            }

            const weatherTableRows = weatherTable.rows;

            const stringValueNameArray = ['temp_c', 'feelslike_c', 'pressure_mb', 'humidity', 'gust_kph', 'chance_of_rain', 'chance_of_snow'];

            let stringValueName;

            for (let k = 0; k < data.forecast.forecastday.length; k++) {
                createWeatherDay(data, k, weatherDays)
            }
            fillingTables(data, weatherTableRows, stringValueNameArray, 0)
            // for (let i = 2; i < weatherTableRows.length; i++) {
            //     const weatherTableRow = weatherTableRows[i];
            //     const tdCollection = weatherTableRow.cells;

            //     let hourIndex = 0;

            //     stringValueName = stringValueNameArray[i - 3]
            //     for (let j = 0; j < tdCollection.length; j++) {
            //         const td = tdCollection[j];



            //         if (td.tagName !== 'TD') {
            //             continue;
            //         } else if (i === 2) {
            //             if (td.innerHTML === '&nbsp;') {
            //                 continue;
            //             }

            //             const providedIconPath = data.forecast.forecastday[0].hour[hourIndex].condition.icon;

            //             let timesOfDay;
            //             if (providedIconPath.includes('night')) {
            //                 timesOfDay = '\\night';
            //             } else if (providedIconPath.includes('day')) {
            //                 timesOfDay = '\\day'
            //             }

            //             const iconName = providedIconPath.slice(providedIconPath.length - 8);

            //             const myIconPath = 'Z:\\web-projects\\practical works\\weatherapi\\project\\imgs\\weather\\64x64' + timesOfDay + iconName

            //             const img = document.createElement('img');
            //             img.src = myIconPath;
            //             img.title = data.forecast.forecastday[0].hour[hourIndex].condition.text;
            //             td.innerHTML = ''
            //             td.append(img)

            //             hourIndex += 3;

            //             continue;
            //         } else {
            //             td.innerHTML = data.forecast.forecastday[0].hour[hourIndex][stringValueName];

            //             if (hourIndex < 21) {
            //                 hourIndex += 3;
            //             } else {
            //                 continue;
            //             }
            //         }
            //     }
            // }

            // выделение текущего времени
            timeColumnSelection(weatherTableRows);

            let weatherDay = document.querySelectorAll('.weather-day');
            weatherDay.forEach((el, index) => el.addEventListener('click', () => {

                for (let i = 0; i < document.querySelectorAll('.weather-day').length; i++) {
                    const element = document.querySelectorAll('.weather-day')[i];

                    element.classList.remove('weather-day_focus')
                }

                el.classList.add('weather-day_focus');
                
                if (index !== 0) {
                    deletingClassCurrentTime();
                } else {
                    timeColumnSelection(weatherTableRows)
                }

                // заполнение таблицы данными текущей даты
                fillingTables(data, weatherTableRows, stringValueNameArray, index);
            }))
            // weatherDay[0].style.boxShadow = 'inset 0px 4px 15px rgb(59 99 151 / 44%)';
            weatherDay[0].className = 'weather-data__day weather-day weather-day_focus';
            // document.addEventListener('click',e=>{
            //     let target = e.target;
            //     console.log(target.parentElement);
            //     if (target.className!== 'weather__weather-day weather-day') {
            //         return
            //     }
            //     let index = [...document.querySelectorAll('.weather__weather-day.weather-day')].indexOf(target)

            //     for (let i = 0; i < document.querySelectorAll('.weather__weather-day.weather-day').length; i++) {
            //         const element = document.querySelectorAll('.weather__weather-day.weather-day')[i];
            //         element.style.backgroundColor = 'rgba(156, 214, 224, 0.95)'
            //     }
            //     target.style.backgroundColor = 'red'

            //     fillingTables(data,weatherTableRows,stringValueNameArray,index);                
            // })
        }
    }

    xhr.send();
}

weatherRequestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sumbit();
})

// создание и заполнение дней
function createWeatherDay(data, index, placeInsert) {
    const weatherDay = document.createElement('div');
    weatherDay.className = 'weather-data__day weather-day';
    weatherDay.tabIndex = '0'
    const weatherDayDate = document.createElement('p');
    weatherDayDate.className = 'weather-day__date';
    const weatherDayImg = document.createElement('img');
    weatherDayImg.className = 'weather-day__img';
    const weatherDayTemperatures = document.createElement('div');
    weatherDayTemperatures.className = 'weather-day__temperatures temperatures';
    const temperaturesMin = document.createElement('p');
    temperaturesMin.className = 'temperatures__min';
    const temperaturesMax = document.createElement('p');
    temperaturesMax.className = 'temperatures__max';

    // заполнение ячейки даты
    weatherDayDate.innerHTML = dateRecognition(data, index);

    const providedIconPath = data.forecast.forecastday[index].day.condition.icon;
    const iconName = providedIconPath.slice(providedIconPath.length - 12);
    const myIconPath = '../imgs/weather/64x64' + iconName;
    weatherDayImg.src = myIconPath;
    weatherDayImg.title = data.forecast.forecastday[index].day.condition.text;

    temperaturesMin.innerHTML = `мин.<br>${data.forecast.forecastday[index].day.mintemp_c}`;

    temperaturesMax.innerHTML = `макс.<br>${data.forecast.forecastday[index].day.maxtemp_c}`;

    placeInsert.append(weatherDay);
    weatherDay.append(weatherDayDate, weatherDayImg, weatherDayTemperatures);
    weatherDayTemperatures.append(temperaturesMin, temperaturesMax);

    placeInsert.style.display = 'flex';
}

// заполнение таблицы данными
function fillingTables(data, weatherTableRows, stringValueNameArray, indexDay) {
    for (let i = 2; i < weatherTableRows.length; i++) {
        const weatherTableRow = weatherTableRows[i];
        const tdCollection = weatherTableRow.cells;

        let hourIndex = 0;

        stringValueName = stringValueNameArray[i - 3];
        for (let j = 0; j < tdCollection.length; j++) {
            const td = tdCollection[j];

            if (td.tagName !== 'TD') {
                continue;
            } else if (i === 2) {
                if (td.innerHTML === '&nbsp;') {
                    continue;
                }

                const providedIconPath = data.forecast.forecastday[indexDay].hour[hourIndex].condition.icon;

                let timesOfDay;
                if (providedIconPath.includes('night')) {
                    timesOfDay = '/night';
                } else if (providedIconPath.includes('day')) {
                    timesOfDay = '/day';
                }

                const iconName = providedIconPath.slice(providedIconPath.length - 8);

                const myIconPath = '../imgs/weather/64x64' + timesOfDay + iconName;

                const img = document.createElement('img');
                img.src = myIconPath;
                img.title = data.forecast.forecastday[indexDay].hour[hourIndex].condition.text;
                td.innerHTML = '';
                td.append(img);

                hourIndex += 3;

                continue;
            } else {
                td.innerHTML = Math.round(data.forecast.forecastday[indexDay].hour[hourIndex][stringValueName]);

                if (stringValueName === 'temp_c' || stringValueName === 'feelslike_c') {
                    if (td.innerHTML[0] !== '-' && td.innerHTML[0] !== '0') {
                        td.innerHTML = `+${td.innerHTML}&deg`;
                    } else {
                        td.innerHTML = `${td.innerHTML}&deg`;
                    }
                }

                if (stringValueName === 'pressure_mb') {
                    td.innerHTML = Math.round(td.innerHTML * 0.750063755419211);
                }

                if (stringValueName === 'gust_kph') {
                    td.innerHTML = (td.innerHTML *= 0.277778).toFixed(1);
                }

                if (hourIndex < 21) {
                    hourIndex += 3;
                } else {
                    continue;
                }
            }
        }
    }
}


// переделка даты из числового формата в текстово-числовой
function dateRecognition(data, index) {
    const dateSelectedDay = data.forecast.forecastday[index].date;
    const formattedDate = new Date(dateSelectedDay);

    const namesDaysWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const monthNames = ['Янрарья', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

    const day = namesDaysWeek[formattedDate.getDay()];
    const number = formattedDate.getDate();
    const month = monthNames[formattedDate.getMonth()];

    return `${day}<br><span>${number}</span><br>${month}`
}


// определение текущего времени
function timeColumnSelection(weatherTableRows) {
    const dataNow = new Date();
    const hourNow = dataNow.getHours();
    const minuteNow = dataNow.getMinutes();

    let roundedTime
    if (minuteNow < 30) {
        roundedTime = Math.floor(`${hourNow}.${minuteNow}`);
    } else if (minuteNow >= 30) {
        roundedTime = Math.ceil(`${hourNow}.${minuteNow}`);
    }

    let indexItem;

    const cellsColection = [...weatherTableRows[1].cells];
    cellsColection.forEach((el, i) => {
        if (el.innerHTML.length === 4) {
            if (`${roundedTime}` === el.innerHTML.slice(0, 1)) {
                indexItem = i;
            } else if (`${roundedTime - 1}` === el.innerHTML.slice(0, 1)) {
                indexItem = i;
            } else if (`${roundedTime + 1}` === el.innerHTML.slice(0, 1)) {
                indexItem = i;
            }
        } else if (el.innerHTML.length === 5) {
            if (`${roundedTime + 1}` === el.innerHTML.slice(0, 2)) {
                indexItem = i;
            } else if (`${roundedTime - 1}` === el.innerHTML.slice(0, 2)) {
                indexItem = i;
            } else if (`${roundedTime + 1}` === el.innerHTML.slice(0, 2)) {
                indexItem = i;
            }
        }
    });

    for (let i = 0; i < weatherTableRows.length; i++) {
        const weatherTableRow = weatherTableRows[i];

        let index = indexItem
        if (weatherTableRow.cells.length === 9) {
            index = indexItem + 1;
        }

        if (i >= 1) {
            const weatherTableRow = weatherTableRows[i];
            if (!weatherTableRow.cells[index].classList.contains('weather-table__current-time')) {
                weatherTableRow.cells[index].classList.add('weather-table__current-time');
            }
        }
    }
}

// удаление класа `текущее время`
function deletingClassCurrentTime() {
    const currentTime = document.querySelectorAll('.weather-table__current-time');

    currentTime.forEach(el => {
        el.classList.remove('weather-table__current-time');
    })
}
