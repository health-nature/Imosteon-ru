(function( $ ) {

    var getByDays = function(days){
        var name = 'randDate' + days;
        if(typeof localStorage !== 'undefined') {
            var time = localStorage.getItem(name);
            if(time) return time;
            time = new Date().getTime() - (days * 24 * 60 * 60 * 1000);
            localStorage.setItem(name, time);
            return time;
        } else {
            var time = $.cookie(name);
            if(time) return time;
            var time = new Date().getTime() - (days * 24 * 60 * 60 * 1000);
            $.cookie(name, time, {expires: 1});
            return time;
        }
    }

    var daysago_default = 29;

    var getRusMonth = function(month){
        switch (month) {
            case 1: return 'января'; break;
            case 2: return 'февраля'; break;
            case 3: return 'марта'; break;
            case 4: return 'апреля'; break;
            case 5: return 'мая'; break;
            case 6: return 'июня'; break;
            case 7: return 'июля'; break;
            case 8: return 'августа'; break;
            case 9: return 'сентября'; break;
            case 10: return 'октября'; break;
            case 11: return 'ноября'; break;
            case 12: return 'декабря'; break;
        }
    }

    var dateByFormat = function(date, format, daysint){
        var data = {
            year : date.getFullYear(),
            month : date.getMonth() + 1,
            day : date.getDate(),
            hour : date.getHours(),
            min : date.getMinutes(),
            sec : date.getSeconds()
        }
        data.rus = getRusMonth(data.month);
        $.each(data, function(key,val){
            if(!(key == 'day' && daysint)){
                if(val < 10) val = '0' + val;
            }
            format = format.replace(key, val);
        });
        return format;
    }

    var methods = {
        init : function(options) {
            return this;
        },
        rstart : function() {
            return this.each(function(i) {
                var format = $(this).attr('format');
                var daysago = $(this).attr('daysago');
                var daysint = typeof $(this).attr('daysint') !== "undefined";
                if(!daysago) daysago = daysago_default;
                var rStart = new Date(parseInt(getByDays(daysago)));
                if(format){
                    $(this).html(dateByFormat(rStart, format, daysint));
                }else{
                    $(this).html(dateByFormat(rStart, 'day rus year', daysint));
                }
            });
        },
        rdate : function() {
            return this.each(function(x) {
                var format = $(this).attr('format');
                var daysago = $(this).attr('daysago');
                var daysint = typeof $(this).attr('daysint') !== "undefined";
                if(!daysago) daysago = daysago_default;
                var rStart = new Date(parseInt(getByDays(daysago)));
                var z = (x >= 16) ? 16 : x;
                var nextDate = new Date(rStart.getTime() + (z * (12 + z) * (60 + x) * 60 * (1000 + x)));
                if(format){
                    $(this).html(dateByFormat(nextDate, format, daysint));
                }else{
                    $(this).html(dateByFormat(nextDate, 'day.month.year hour:min', daysint));
                }
            });
        },
        ryear : function() {
            return this.each(function(i) {
                var value = $(this).data("decrease"),
                    decrease = value && value > 0 && value === parseInt(+value, 10)  && !isNaN(parseInt(value))
                        ? value : 0;

                $(this).html(new Date().getFullYear() - decrease);
            });
        },
        rnow : function() {
            return this.each(function(i) {
                var format = $(this).attr('format');
                var daysint = typeof $(this).attr('daysint') !== "undefined";
                var nowDate = new Date();
                if(format){
                    $(this).html(dateByFormat(nowDate, format, daysint));
                }else{
                    $(this).html(dateByFormat(nowDate, 'day rus', daysint));
                }
            });
        }
    };

    $.fn.randDate = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call( arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Метод с именем ' +  method + ' не существует для jQuery.randDate');
        }
    };
})(jQuery);

$(function () {
    $('.rstart, .startdate').randDate('rstart');
    $('.rdate, .ypdate, .randdate').randDate('rdate');
    $('.ryear, .nowyear').randDate('ryear');
    $('.rnow, .nowdate').randDate('rnow');
});
        $(document).ready(function() {
       
            function scrollBtn() {
                $('.fixedtop__btn, .fixedtop__btnt').on('click', function(event) {
                    event.preventDefault();
                    var top = $('.lastform').offset().top;
                    $('body,html').animate({
                        scrollTop: top - 250
                    }, 1500);
                });
            };
            // Call Func
            scrollBtn();

        });