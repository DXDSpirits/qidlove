
$(function() {
    
    var scroller;
    
    var SectionView = Backbone.View.extend({
        onEnter: function() {},
        onLeave: function() {}
    });
    
    var HeroView = new (SectionView.extend({
        
    }))({el: $('#hero')});
    
    var TheGirlView = new (SectionView.extend({
        onEnter: function() {
            this.$('.shy-girl').addClass('invisible');
            this.$('.love-cross').addClass('crossed');
        },
        onLeave: function() {
            this.$('.shy-girl').removeClass('invisible');
            this.$('.love-cross').removeClass('crossed');
        }
    }))({el: $('#thegirl')});
    
    var TheBigDayView = new (SectionView.extend({
        onEnter: function() {
            var $timeline = this.$('.timeline');
            var gap = $timeline.outerHeight() - this.$el.innerHeight();
            var translate = 'translate3d(0, ' + (-gap) + 'px, 0)';
            $timeline.addClass('animate');
            $timeline.css({
                '-webkit-transform': translate,
                'transform': translate
            });
            //scroller.disable();
            //setTimeout(function() { scroller.enable(); }, 10000);
        },
        onLeave: function() {
            var $timeline = this.$('.timeline');
            $timeline.removeClass('animate');
            $timeline.css({
                '-webkit-transform': 'translate3d(0, 0, 0)',
                'transform': 'translate3d(0, 0, 0)'
            });
        }
    }))({el: $('#thebigday')});
    
    var ProposalView = new (SectionView.extend({
        onEnter: function() {
            this.$('.rose-cover').addClass('animate');
            this.$('.the-ring').addClass('animate');
        },
        onLeave: function() {
            this.$('.rose-cover').removeClass('animate');
            this.$('.the-ring').removeClass('animate');
        }
    }))({el: $('#proposal')});
    
    var GoodMorningView = new (SectionView.extend({
        
    }))({el: $('#goodmorning')});
    
    var LaVieView = new (SectionView.extend({
        onEnter: function() {
            this.$('.cover').addClass('flip');
            this.$('.bouquet').addClass('slidein');
        },
        onLeave: function() {
            this.$('.cover').removeClass('flip');
            this.$('.bouquet').removeClass('slidein');
        }
    }))({el: $('#lavie')});
    
    /*************************************************************/
    
    function startApp() {
        $('img').each(function() {
            var src = $(this).data('src');
            src && $(this).attr('src', src);
        });
        $('.view').css('height', $('.view-wrapper').innerHeight());
        scroller = new IScroll('.view-wrapper', {
            momentum: false,
            bounce: false,
            snap: true,
            snapSpeed: 500,
            snapThreshold: 0.1,
            mouseWheel: true,
            eventPassthrough: 'horizontal'
        });
        var sectionList = [HeroView, TheGirlView, TheBigDayView, ProposalView, GoodMorningView, LaVieView];
        scroller.on('scrollEnd', function() {
            var page = scroller.currentPage.pageY;
            sectionList[page] && sectionList[page].onEnter();
            sectionList[page+1] && sectionList[page+1].onLeave();
            sectionList[page-1] && sectionList[page-1].onLeave();
        });
        scroller.goToPage(0, 0);
    }
    
    var imageList = [
        "img/angel.jpg", "img/dolphin.jpg",
        "img/thegirl1.jpg", "img/thegirl2.jpg", "img/thegirl3.jpg", "img/thegirl4.jpg", "img/thegirl5.jpg",
        "img/thestory1.jpg", "img/thestory2.jpg", "img/thestory3.jpg",
        "img/heart-cross-pink.png",
        "img/thecouple1.jpg", "img/thecouple2.jpg", "img/thecouple3.jpg", "img/thecouple4.jpg", "img/thecouple.png",
        "img/story-cover.jpg", "img/story-cover-text.jpg",
        "img/rose-bottom.jpg", "img/rose-top.jpg",
        "img/ring.png", "img/ring1.jpg", "img/ring2.jpg", "img/nightsky.jpg",
        "img/food1.jpg", "img/food2.jpg", "img/food3.jpg", "img/food4.jpg",
        "img/cover-page-dark.jpg", "img/cover-page-light.jpg",
        "img/bouquet.png", "img/amalfi.jpg"
    ];
    var l = imageList.length, i=0;
    function imageLoaded() {
        l--;
        $('.loading-text>span').text(parseInt((1-l/imageList.length)*100) + '%');
        if (l == 0) {
            $('.loading-text').addClass('hidden');
            $('.view-wrapper').removeClass('hidden');
            startApp();
        }
    }
    for (i=0; i<imageList.length; i++) {
        var image = new Image();
        image.onload = imageLoaded;
        image.src = imageList[i];
    }
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        var message = {
            "img_url" : 'http://love.oatpie.com/dolphin/img/story-cover.jpg',
            "img_width" : "640",
            "img_height" : "640",
            "link" : 'http://love.oatpie.com/dolphin/',
            "desc" : "",
            "title" : "天使与海豚的爱情故事"
        };
        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            WeixinJSBridge.invoke('sendAppMessage', message);
        });
        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            WeixinJSBridge.invoke('shareTimeline', message);
        });
    }, false);
});
