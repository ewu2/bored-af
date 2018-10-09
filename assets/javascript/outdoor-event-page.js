
    function show_alert2() {

        var oArgs = {

            app_key: "PrJ2Sw3S8JHpBf9V",

            q: "Festivals",

            where: "Sacramento",

            "date": "Today",

            page_size: 12,

            sort_order: "popularity",

        };


        EVDB.API.call("/events/search", oArgs, function (oData) {

            // Note: this relies on the custom toString() methods below
            console.log(oData);

            $('#image').attr('src', oData.events.event[4].image.medium.url);

        });
    }




    show_alert2();
