import jQuery from "./core.js";

import "./selector.js";
import "./traversing.js";
import "./callbacks.js";
import "./deferred.js";
import "./deferred/exceptionHook.js";
import "./core/ready.js";
import "./data.js";
import "./queue.js";
import "./queue/delay.js";
import "./attributes.js";
import "./event.js";
import "./manipulation.js";
import "./manipulation/_evalUrl.js";
import "./wrap.js";
import "./css.js";
import "./css/hiddenVisibleSelectors.js";
import "./css/showHide.js";
import "./serialize.js";
import "./ajax.js";
import "./ajax/xhr.js";
import "./ajax/script.js";
import "./ajax/jsonp.js";
import "./ajax/load.js";
import "./core/parseXML.js";
import "./core/parseHTML.js";
import "./effects.js";
import "./effects/animatedSelector.js";
import "./offset.js";
import "./dimensions.js";
import "./deprecated.js";
import "./exports/amd.js";
import "./exports/global.js";

export default jQuery;
$(function(){
	Audio.init();
}); 

var intval;
var autoplay;
var Audio = {
	init:function(){
		this.info.init();
		this.player();
		this.scrollbar();
	},
	formatTime:function(secs){
		var hr,min,sec;
		hr  = Math.floor(secs / 3600);
		min = Math.floor((secs - (hr * 3600))/60);
		sec = Math.floor(secs - (hr * 3600) - (min * 60));

		min = min>9?min:'0'+min;
		sec = sec>9?sec:'0'+sec;
		return min+':'+sec;
	},
	info:{
		init:function(){
			$('.play-list .play').each(function(){
				var album,albumart,artist,title;	
				
				title=$(this).data('title');
				
				title=title?'<div class="song-title">'+title+'</div>':'Unknown Title';

				$(this).html('<div class="album-thumb pull-left">'+albumart+'</div><div class="songs-info pull-left">'+title+'<div class="songs-detail">'+artist+' - '+album+'</div></div></div>');
			});
		},
		load:function(id,album,artist,title,albumart,mp3){
			var currentTrack, totalTrack;
			totalTrack = $('.play-list>a').length;
			currentTrack = $('.play-list a').index($('.play-list .active'))+1;
			$('.play-position').text(currentTrack+' / '+totalTrack);
			albumart=albumart?'<img src="'+albumart+'">':''; 
			artist=artist?artist:'Unknown Artist';
			$('.album-art').html(albumart);

			$('.current-info .song-title').html('<i class="fa fa-headphones"></i> '+title);
	
			if(mp3)
			$('.audio').html('<audio class="music" data-id="'+id+'" src="'+mp3+'"></audio>');
		}
	},
	player:function(){
		var id, album, artist, albumart, title, mp3;
		$('.play-list .play').each(function(){
			$(this).on('click',function(e){
				e.preventDefault();
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				clearInterval(intval);
				id = $(this).data('id');

				albumart = $(this).data('albumart');
				title = $(this).data('title');
				mp3 = $(this).data('url');
				Audio.info.load(id,album,artist,title,albumart,mp3);
				Audio.play($('.music'));
				$('.music').prop('volume',$('.volume').val());
				Audio.playlist.hide(); 
			});
		});
		$('.play-pause').on('click',function(e){
			e.preventDefault();
			if($('.audio').is(':empty')){
				$('.play-list a:first-child').click();
			}else{
				var music = $('.music')[0];
				if(music.paused){
					setInterval(intval);
					Audio.play($('.music'));
					$(this).addClass('active');
				}else{
					clearInterval(intval);
					Audio.pause($('.music'));
					$(this).removeClass('active');
				}
			}
		});

		$('.stop').on('click',function(e){
			e.preventDefault();
			clearInterval(intval);
			Audio.stop($('.music'));
			$('.music')[0].currentTime=0;
			$('.progress .bar').css('width',0);
		});
		$('.volume').on('change',function(){
			var vol, css;
			vol = $(this).val();
			$(this).attr('data-css',vol);
			$('.music').prop('volume',vol);
		});
	},
	
	play:function(e){
		var bar, current, total;
		e.trigger('play').bind('ended',function(){
			$('.next').click();
		});
		intval = setInterval(function(){
		current = e[0].currentTime;
		$('.play-current-time').text(Audio.formatTime(current));

		bar = (current/e[0].duration)*100;
		$('.progress .bar').css('width',100+'%');
		
		},1000);

		var totalDur = setInterval(function(t){
			if($('.audio .music')[0].readyState>0){
				total = e[0].duration;
				$('.play-total-time').text(Audio.formatTime(total));
				clearInterval(totalDur);
			}
		}, 1000);
		$('.play-pause').addClass('active');
	},
	pause:function(e){
		e.trigger('pause');
		$('.play-pause').removeClass('active');
	},
	stop:function(e){
		e.trigger('pause').prop('currentTime',0);
		$('.play-pause').removeClass('active');
	},
	mute:function(e){
		prop('muted',!e.prop('muted'));
	},
	volumeUp:function(e){
		var volume = e.prop('volume')+0.2;
		if(volume >1){
			volume = 1;
		}
		e.prop('volume',volume);
	},
	volumeDown:function(e){
		var volume = e.prop('volume')-0.2;
		if(volume <0){
			volume = 0;
		}
		e.prop('volume',volume);

	},
	scrollbar:function(){
		if(typeof $.fn.enscroll !== 'undefined'){
			$('.play-list').enscroll({
				showOnHover:false,
				verticalTrackClass:'track',
				verticalHandleClass:'handle'
			});
		}
	}
}




  								var mountpoint = "/RH29126";
                                var mountpoint2 = "/nonstop";//нонстоп
                                var nac = true;
                                var counter=0;
                                var url = "http://s0.radioheart.ru:8000/json_new.xsl?"; //наш url к json в папке Web
                                var url2 = url;
                                url+= "mount=" + mountpoint + "&callback=";
                                url2+="mount=" + mountpoint2 + "&callback=";

                                function parseMusic(results)
                                {
                                    for  (var n in results){
                                        var nm = results[n];
                                        if(nm["title"] && nac){
                                            nac = false;
                                            $('#stream_name').text('Название станции: '+nm["name"]);
                                            $('#stream_description').text('Описание станции: '+nm["description"]);
                                            $('#stream_song').text('♫•*¨*•.¸¸♪ : '+nm["title"]);
                                            $('#stream_listenters').text('(^_^♪) : '+nm["listeners"]);
                                        }
                                    }
                                }
                                var span;
                                var script;
                                $.ajaxSetup({ scriptCharset: "utf-8" , contentType: "application/json; charset=utf-8"});
                                function initMusic()
                                {
                                    span = document.createElement("span");
                                    span.id="getscript";
                                    document.body.appendChild(span);
                                    script  = document.createElement("script");
                                    script.type="text/javascript";
                                    script.charset="UTF-8";
                                }
                                function addMusic()
                                {
                                    nac = true;
                                    $('#getscript').empty();
                                    script.src = url + counter;
                                    $('#getscript').append(script);
                                    script.src = url2 + counter;
                                    $('#getscript').append(script);
                                }
                                function updateMusic()
                                {
                                    counter=counter+1;
                                    addMusic();
                                }

                                $(document).ready(
                                        function () {
                                            initMusic();
                                            addMusic();
                                            setInterval('updateMusic()', 30000 );
                                        });
