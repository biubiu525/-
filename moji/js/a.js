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
                        Dayinfo(cityid)
                        Futureinfo(cityid)
                        Aircondition(cityid)

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


}

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

            console.log(wlis)

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