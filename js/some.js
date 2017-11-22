(function($) {
    function updateDeadline() {
        var deadline = $(this).attr("data-deadline") || undefined;
        if (!deadline) return !1;
        deadline = deadline.replace(/-/g,"/")
        var str = "",
            $this = $(this),
            now = new Date().getTime(),
            deadline = new Date(deadline).getTime(),
            n = Math.round((deadline - now) / 1000);
        if (n <= 0) {
            $this.text("0天00:00:00")
            return !1;
        }
        var days = Math.floor(n / 60 / 60 / 24),
            hours = Math.floor(n / 60 / 60) % 24,
            minutes = Math.floor(n / 60) % 60,
            seconds = n % 60;
        hours = (hours < 9) ? "0" + hours : hours;
        minutes = (minutes < 9) ? "0" + minutes : minutes;
        seconds = (seconds < 9) ? "0" + seconds : seconds;
        $this.text(days + "天" + hours + ":" + minutes + ":" + seconds)
        setTimeout(updateDeadline.bind($this), 1000);
    }
    $.fn.extend({
        deadline: updateDeadline
    })
})(jQuery);