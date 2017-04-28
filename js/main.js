var cMap = {
    'USD': [196, 112, '$', 'AM', 'usd'],
    'EUR': [493, 89, '', 'CO', 'eur'],
    'JPY': [832, 126, '日元', 'JP', 'japan'],
    'CAD': [257, 82, '', 'JP', 'cad'],
    'GBP': [464, 86, '', 'JP', 'gbp'],
    'CHF': [488, 102, 'CHF', 'JP', 'chf'],
    'RUB': [575, 84, '$', 'JP', 'rub'],
    'AUD': [783, 291, '$', 'JP', 'aud'],
    'SEK': [511, 66, 'Kr', 'JP', ''],
    'DKK': [491, 78, 'Kr', 'JP', ''],
    'HKD': [773, 166, 'HK$', 'JP', ''],
    'PLN': [513, 83, '', 'JP', ''],
    'CNY': [758, 131, '元', 'CN', 'China'],
    'SGD': [741, 230, '$', 'JP', ''],
    'THB': [736, 183, '$', 'JP', ''],
    'NOK': [490, 61, 'Kr', 'JP', ''],
    'ILS': [562, 142, '', 'JP', ''],
    'BRL': [320, 248, 'R$', 'JP', ''],
    'ZAR': [530, 307, 'R', 'JP', ''],
}

// var stage = new Kinetic.Stage({
//     container: 'mapcontainer',
//     width: 1015,
//     height: 530,
// });

// var img = new Image();
// img.src = "img/btc_logo_30.png";

function aBuy(source, bitcoins, price, currencyName, proxySpread) {
    if (typeof proxySpread == 'undefined') {
        proxySpread = 0;
    }
    console.log(source + ' aBuy of '+bitcoins+' for $'+price+' of '+currencyName);
    if (typeof cMap[currencyName] === 'undefined') {
        console.log('currency not yet added to fiatleak - ' + currencyName);
        return;
    }
    var trade = {'code': cMap[currencyName][3], 'name': cMap[currencyName][4], 'value':bitcoins, 'color': getRandomColor()}
    mapData.push(trade);
    console.log(mapData);
    myChart.setOption({
        series: [{
            // 根据名字对应到相应的系列
            data: mapData.map(function (itemOpt) {
                return {
                    name: itemOpt.name,
                    value: [
                        latlong[itemOpt.code].longitude,
                        latlong[itemOpt.code].latitude,
                        itemOpt.value
                    ],                    
                    symbol:'circle',
                    symbolSize : function (v){
                        return 0.1
                    },
                    effect : {
                        show: false,
                        shadowBlur : 100
                    },
                    itemStyle:{
                        emphasis: {
                            label:{show:false}
                        },
                        normal: {
                            borderWidth: 2,
                            borderColor: itemOpt.color,
                            color: 'transparent'
                        }
                    },
                };
            })
        }]
    });

    // var layer = new Kinetic.Layer();

    // var circle = new Kinetic.Circle({
    //     radius: 10,
    //     fill: '#f7931a',
    //     stroke: '#ffffff',
    //     strokeWidth: 2
    // });

    // var image = new Kinetic.Image({
    //     image: img,
    //     width: 30,
    //     x: 10,
    //     y: 380,
    //     height: 30,
    // });


    // layer.add(image);
    // stage.add(layer);

    // var tween = new Kinetic.Tween({
    //     node: image,
    //     duration: 6,
    //     rotation: Math.PI * 2,
    //     x: cMap[currencyName][0],
    //     y: cMap[currencyName][1],
    //     easing: Kinetic.Easings.EaseOut,
    //     onFinish: function () {
    //         layer.destroy();

    //         var cVal = Number(bitcoins*price)+cValues[currencyName];
    //         cValueBoxes[currencyName].setText(Math.round(cVal));
    //         cValues[currencyName] = cVal;

    //         var bVal = Number(bitcoins)+bValues[currencyName];
    //         bValueBoxes[currencyName].setText('+' + Math.round(bVal));
    //         bValues[currencyName] = bVal;

    //         rateValueBoxes[currencyName].setText('@' + Math.round(Number(price)*100)/100);

    //         var tbVal = Number(bitcoins) + tbValue;
    //         totalB.setText('+' + Math.round(tbVal*100)/100 + ' BTC');
    //         tbValue = tbVal;

    //         nowBtcTotal += Number(bitcoins);

    //         paisLayer.draw();

    //     }
    // });

    // tween.play();
}

function getRandomColor(){
  return  '#' +
    (function(color){
    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
      && (color.length == 6) ?  color : arguments.callee(color);
  })('');
};

var socket = io.connect('http://54.254.172.238:8003'); //prod
socket.on('proxyBuy', function (data) {
    aBuy(data[0], data[1], data[2], data[3], 1);
});

