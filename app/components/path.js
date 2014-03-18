Crafty.c("Path", {
    __tile: 0,
    __tileh: 0,
    ready: false,

    init: function () {
        this.requires('Canvas')
        this.__trim = [0, 0, 0, 0];
        var self = this;
        var draw = function (e) {
            var co = e.co,
                pos = e.pos,
                context = e.ctx;

            self.trigger('draw', context)

        };


        this.bind("EnterFrame", draw).bind("RemoveComponent", function (id) {
            if (id === "Path") this.unbind("Draw", draw);
        });
    },
    path: function() {

    }

});
