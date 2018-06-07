$('#getWeatherBtn').click(() => {
    $('#chart-container').hide();
    $('#chart-containers').hide();
    const cityName = $('#cityInput').val();
    const cityNames = $('#cityInputs').val();
    $.ajax({
        type: 'GET',
        url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=27d43832d2a4adcb97fcbfa23db130aa`,
        success: (data) => {
            const currentTemp = Math.round(data.main.temp - 270);
            const currentPressure = data.main.pressure;
            const humidity = data.main.humidity;
            $('#currentTemperature').html(currentTemp);
            $('#currentPressure').html(currentPressure);
            $('#currrentHumidity').html(humidity);
            $('table').show();
        },
        error: (err) => {
            console.log('In error callback');
            console.log(err);
        }
    }),

    $.ajax({
        type: 'GET',
        url: `http://api.openweathermap.org/data/2.5/weather?q=${cityNames}&appid=27d43832d2a4adcb97fcbfa23db130aa`,
        success: (data) => {
            const currentTemps = Math.round(data.main.temp - 270);
            const currentPressures = data.main.pressure;
            const humiditys = data.main.humidity;
            $('#currentTemperatures').html(currentTemps);
            $('#currentPressures').html(currentPressures);
            $('#currrentHumiditys').html(humiditys);
            $('table').show();
        },
        error: (err) => {
            console.log('In error callback');
            console.log(err);
        }
    });

})



$('#getForecastBtn').click(() => {
    $('table').hide();
    const cityName = $('#cityInput').val();
    const cityNames = $('#cityInputs').val();
    $.ajax({
        type: 'GET',
        url: `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=133b42fff699f45866056ed2e4a093db`,
        success: (data) => {
            console.log('In success callback');
            console.log(data);

            listOfDates = data.list.map((ele) => moment(ele.dt * 1000).format('dddd, h:mm a'));
            console.log(listOfDates);
            listOfTemp = data.list.map(ele => Math.round(ele.main.temp - 270));
            console.log(listOfTemp);
            plotChart(listOfTemp, listOfDates);
        },
        error: (err) => {
            console.log('In error callback');
            console.log(err);
        }
    }),

    $.ajax({
        type: 'GET',
        url: `http://api.openweathermap.org/data/2.5/forecast?q=${cityNames}&appid=133b42fff699f45866056ed2e4a093db`,
        success: (data) => {
            console.log('In success callback');
            console.log(data);

            listOfDatess = data.list.map((ele) => moment(ele.dt * 1000).format('dddd, h:mm a'));
            console.log(listOfDates);
            listOfTemps = data.list.map(ele => Math.round(ele.main.temp - 270));
            console.log(listOfTemp);
            plotCharts(listOfTemps, listOfDatess);
        },
        error: (err) => {
            console.log('In error callback');
            console.log(err);
        }
    });

    const plotChart = (tempArr, datesArr) => {
        $('#chart-container').show();
        Highcharts.chart('chart-container', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Monthly Average Temperature'
            },
            xAxis: {
                categories: datesArr
            },
            yAxis: {
                title: {
                    text: 'Temperature'
                },
                labels: {
                    formatter: function () { return this.value + '°'; }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                }
            },
            series: [{
                name: cityName,
                marker: {
                    symbol: 'square'
                },
                data: tempArr

            }]
        });
    }

    const plotCharts = (tempArr, datesArr) => {
        $('#chart-containers').show();
        Highcharts.chart('chart-containers', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Monthly Average Temperature'
            },
            xAxis: {
                categories: datesArr
            },
            yAxis: {
                title: {
                    text: 'Temperature'
                },
                labels: {
                    formatter: function () { return this.value + '°'; }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                }
            },
            series: [{
                name: cityNames,
                marker: {
                    symbol: 'square'
                },
                data: tempArr

            }]
        });
    }

})