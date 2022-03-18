window.onload = function() {
    const city = document.querySelector(".city")
    const search = document.querySelector(".search")
    const r = document.querySelector(".return")
    const input = document.querySelector(".input")
    const s = search.querySelector(".s")
    const tips = search.querySelectorAll(".tips")
    const head = search.querySelector(".head")
    const city_list = search.querySelector(".city_list")
    const active = document.querySelector(".active")
    const aa = active.querySelector("a")
    const active_citys = document.querySelector(".active_citys")
    const sl = search.querySelectorAll("a")
    const data = new Date();
    const d = data.getFullYear() + '0' + (data.getMonth() + 1) + '' + data.getDate()
    console.log(d)



    city.onclick = function() {
        search.style.display = "block";
    }
    r.onclick = function() {
        search.style.display = "none";
    }

    s.onclick = function() {
        city_list.style.display = "block"
        for (var i = 0; i < 3; i++) {
            tips[i].style.display = "none"
        }
        // city_list.removeChild()
        var location = input.value;
        var key = "69505f28c0e1414cbb24927a8e055499";
        $.ajax({
            url: "https://geoapi.qweather.com/v2/city/lookup", //城市信息查询API目的获得locationID 可用
            data: {
                key: key,
                location: location
            },
            success: function(data) {
                console.log(data)

                var first = city_list.firstChild
                while (first) {
                    first.remove()
                    var first = city_list.firstChild

                }
                for (var i = 0; i < data.location.length; i++) {
                    var cityid = data.location[i].id
                    const li = []
                    li[i] = document.createElement("li")
                    li[i].innerHTML = "<a>" + data.location[i].name + "</a>"
                    city_list.appendChild(li[i])
                    li[i].onclick = function() {
                        const inh = this.innerText
                        console.log(inh)
                        city.innerHTML = inh
                        active_citys.innerHTML = "<li>" + "<a>" + inh + "</a>" + "</li>"

                        city_list.style.display = "none"
                        for (var i = 0; i < 3; i++) {
                            tips[i].style.display = "block"
                        }
                        aa.innerText = inh
                        console.log(cityid)
                        search.style.display = "none";
                        Dayinfo(cityid)
                        Futureinfo(cityid)
                        Aircondition(cityid)
                        sun(cityid, d)

                    }


                }

                // const lis = city_list.querySelectorAll("li")
                // for (var i = 0; i < lis.length; i++) {
                //     lis[i].onclick = function() {
                //         const inh = this.innerText
                //         console.log(inh)
                //         city.innerHTML = inh
                //         search.style.display = "none";



                //     }
                // }
            },
            dataType: "json", //json xml text
            jsonp: "callback",
            jsonpCallback: "haha"
        });

    }

    console.log(sl[0].innerHTML)
    for (var i = 0; i < sl.length; i++) {
        sl[i].onclick = function() {
            var location = this.innerText
            city.innerHTML = this.innerText

            var key = "69505f28c0e1414cbb24927a8e055499";
            $.ajax({
                url: "https://geoapi.qweather.com/v2/city/lookup",
                data: {
                    key: key,
                    location: location
                },
                success: function(data) {
                    console.log(data)
                    var cityid = data.location[0].id

                    console.log(cityid)
                    search.style.display = "none";
                    Dayinfo(cityid)
                    Futureinfo(cityid)
                    Aircondition(cityid)
                    sun(cityid, d)


                    // const lis = city_list.querySelectorAll("li")
                    // for (var i = 0; i < lis.length; i++) {
                    //     lis[i].onclick = function() {
                    //         const inh = this.innerText
                    //         console.log(inh)
                    //         city.innerHTML = inh
                    //         search.style.display = "none";



                    //     }
                    // }
                },
                dataType: "json", //json xml text
                jsonp: "callback",
                jsonpCallback: "haha"
            });


        }
    }
}

// for (var i = 0; i <= sl.length; i++) {
//     sl[i].onclick = function() {
//         var location = sl[i].innerText
//         var key = "69505f28c0e1414cbb24927a8e055499";
//         $.ajax({
//             url: "https://geoapi.qweather.com/v2/city/lookup",
//             data: {
//                 key: key,
//                 location: location
//             },
//             success: function(data) {
//                 console.log(data)
//                 var cityid = data.location[0].id

//                 console.log(cityid)
//                 Dayinfo(cityid)
//                 Futureinfo(cityid)
//                 Aircondition(cityid)
//                 sun(cityid, d)


//                 // const lis = city_list.querySelectorAll("li")
//                 // for (var i = 0; i < lis.length; i++) {
//                 //     lis[i].onclick = function() {
//                 //         const inh = this.innerText
//                 //         console.log(inh)
//                 //         city.innerHTML = inh
//                 //         search.style.display = "none";



//                 //     }
//                 // }
//             },
//             dataType: "json", //json xml text
//             jsonp: "callback",
//             jsonpCallback: "haha"
//         });


//     }
// }







function Dayinfo(location) { //获得今天的所有实况天气
    var key = "69505f28c0e1414cbb24927a8e055499";
    $.ajax({
        url: "https://devapi.qweather.com/v7/weather/now", //实时天气
        data: {
            key: key,
            location: location
        },
        success: function(data) {
            console.log(data);
            const info_wea = document.querySelector(".info_wea")
            const info_about = document.querySelector(".info_about")
            const em = info_about.querySelector("em")
            const ps = info_about.querySelectorAll("p")
            ps[0].innerText = data.now.windDir + data.now.windScale + "级" + " 湿度" + data.now.humidity + "%"
            info_wea.innerText = data.now.text
            em.innerText = data.now.temp
            if (data.now.text === "阴") {
                ps[1].innerText = "天气阴冷，穿暖和一点吧！"

            } else if (data.now === "雨") {
                ps[1].innerText = "明天有雨，天气阴冷，穿暖和一点吧！"

            }


        },
        dataType: "json", //json xml text
        jsonp: "callback",
        jsonpCallback: "haha"
    });
}

function Futureinfo(location) {
    var key = "69505f28c0e1414cbb24927a8e055499";
    $.ajax({
        url: "https://devapi.qweather.com/v7/weather/3d",
        data: {
            key: key,
            location: location
        },
        success: function(data) {
            console.log(data);
            const weak_wea = document.querySelector(".weak_wea")
            const wlis = weak_wea.querySelectorAll(".wem")

            const single = document.querySelectorAll(".single")
            console.log(single)
            const s0b = single[0].querySelector("b")
            const s1b = single[1].querySelector("b")
            const s0st = single[0].querySelector("strong")
            const s1st = single[1].querySelector("strong")
            const simg0 = single[0].querySelector("img")
            const simg1 = single[1].querySelector("img")
            const wea = document.querySelectorAll(".wea")
            s0b.innerText = data.daily[0].tempMin + " / " + data.daily[0].tempMax
            s1b.innerText = data.daily[1].tempMin + " / " + data.daily[1].tempMax
            s0st.innerText = data.daily[0].textDay
            s1st.innerText = data.daily[1].textDay


            if (data.daily[0].textDay == "小雨") {
                simg0.src = "../moji/images/w7.png";
            } else if (data.daily[0].textDay == "中雨") {
                simg0.src = "../moji/images/w8.png";
            } else if (data.daily[0].textDay == "阵雨") {
                simg0.src = "../moji/images/w9.png";
            } else if (data.daily[0].textDay == "大雨") {
                simg0.src = "../moji/images/w10.png";
            } else if (data.daily[0].textDay == "雷阵雨") {
                simg0.src = "../moji/images/w4.png";
            } else if (data.daily[0].textDay == "晴") {
                simg0.src = "../moji/images/w0.png";
            } else if (data.daily[0].textDay == "多云") {
                simg0.src = "../moji/images/w1.png";
            } else if (data.daily[0].textDay == "阴") {
                simg0.src = "../moji/images/w2.png";
            }



            if (data.daily[1].textDay == "小雨") {
                simg1.src = "../moji/images/w7.png";
            } else if (data.daily[1].textDay == "中雨") {
                simg1.src = "../moji/images/w8.png";
            } else if (data.daily[1].textDay == "阵雨") {
                simg1.src = "../moji/images/w9.png";
            } else if (data.daily[1].textDay == "大雨") {
                simg1.src = "../moji/images/w10.png";
            } else if (data.daily[1].textDay == "雷阵雨") {
                simg1.src = "../moji/images/w4.png";
            } else if (data.daily[1].textDay == "晴") {
                simg1.src = "../moji/images/w0.png";
            } else if (data.daily[1].textDay == "多云") {
                simg1.src = "../moji/images/w1.png";
            } else if (data.daily[1].textDay == "阴") {
                simg1.src = "../moji/images/w2.png";
            }


            console.log(wea[1].dt)



            console.log(data.daily[2].fxDate)

            if (new Date(data.daily[2].fxDate).getDay() == 0) {
                wlis[0].innerHTML = "周六";
                wlis[1].innerHTML = "周日";
                wlis[2].innerHTML = "周一";
                wlis[3].innerHTML = "周二";
                wlis[4].innerHTML = "周三";
                wlis[5].innerHTML = "周四";

            } else if (new Date(data.daily[2].fxDate).getDay() == 1) {
                wlis[0].innerHTML = "周日";
                wlis[1].innerHTML = "周一";
                wlis[2].innerHTML = "周二";
                wlis[3].innerHTML = "周三";
                wlis[4].innerHTML = "周四";
                wlis[5].innerHTML = "周五";

            } else if (new Date(data.daily[2].fxDate).getDay() == 2) {
                wlis[0].innerHTML = "周一";
                wlis[1].innerHTML = "周二";
                wlis[2].innerHTML = "周三";
                wlis[3].innerHTML = "周四";
                wlis[4].innerHTML = "周五";
                wlis[5].innerHTML = "周六";

            } else if (new Date(data.daily[2].fxDate).getDay() == 3) {
                wlis[0].innerHTML = "周二";
                wlis[1].innerHTML = "周三";
                wlis[2].innerHTML = "周四";
                wlis[3].innerHTML = "周五";
                wlis[4].innerHTML = "周六";
                wlis[5].innerHTML = "周日";

            } else if (new Date(data.daily[2].fxDate).getDay() == 4) {
                wlis[0].innerHTML = "周三";
                wlis[1].innerHTML = "周四";
                wlis[2].innerHTML = "周五";
                wlis[3].innerHTML = "周六";
                wlis[4].innerHTML = "周日";
                wlis[5].innerHTML = "周一";

            } else if (new Date(data.daily[2].fxDate).getDay() == 5) {
                wlis[0].innerHTML = "周四";
                wlis[1].innerHTML = "周五";
                wlis[2].innerHTML = "周六";
                wlis[3].innerHTML = "周日";
                wlis[4].innerHTML = "周一";
                wlis[5].innerHTML = "周二";

            } else if (new Date(data.daily[2].fxDate).getDay() == 6) {
                wlis[0].innerHTML = "周五";
                wlis[1].innerHTML = "周六";
                wlis[2].innerHTML = "周日";
                wlis[3].innerHTML = "周一";
                wlis[4].innerHTML = "周二";
                wlis[5].innerHTML = "周三";

            }


        },
        dataType: "json",
        jsonp: "callback",
        jsonpCallback: "haha"
    });
}

function Aircondition(location) {
    var key = "69505f28c0e1414cbb24927a8e055499";
    $.ajax({
        url: "https://devapi.qweather.com/v7/air/now",
        data: {
            key: key,
            location: location
        },
        success: function(data) {
            console.log(data)
            const info_a = document.querySelector(".info_a")
            const ws = info_a.querySelector("strong")
            ws.innerHTML = data.now.pm2p5 + "  " + data.now.category



        },
        dataType: "json",
        jsonp: "callback",
        jsonpCallback: "haha"
    });
}

function sun(location, d) {
    var key = "69505f28c0e1414cbb24927a8e055499";
    $.ajax({
        url: "https://devapi.qweather.com/v7/astronomy/sun",
        data: {
            key: key,
            location: location,
            date: d


        },
        success: function(data) {
            console.log(data)
            const tabs = document.querySelector(".tabs")
            const ts = tabs.querySelector("strong")
            const reg = /([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/
            const dt = reg.exec(data.sunset)
            console.log(dt[0])
            ts.innerHTML = "日落" + dt[0]




        },
        dataType: "json",
        jsonp: "callback",
        jsonpCallback: "haha"
    });

}