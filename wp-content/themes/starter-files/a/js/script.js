function homepageBCookie() {	

	if ($('#homepage #homeHeaderB').length > 0) {	
		var visiting = Cookies.get('visiting');		
		if (visiting == 'yes') {		
			$('body').addClass('bypass');					
		} else {		
			Cookies.set('visiting', 'yes');
		}	
	}    
}

function priorityNavGo() {	
 var wrapper = document.querySelector('#navTert');
    var nav = priorityNav.init({
        mainNavWrapper: '#navTert',
        breakPoint: 0
    });    
}

function showMore() {
  $('#mobiMore').click(function() {
        $('#navTert').toggleClass('mobiTertOpen');
        $(this).toggleClass('mobiClosed mobiOpened');
    });
}

function mobiMore() {
  $('#mobiOpen').click(function() {        
        $(this).toggleClass('mobiClosed mobiOpened');
        $('#navWrap').toggleClass('open');
    });
}

function subNavMore() {
  $('#subNavHead a').click(function() {
        $('#subnav').toggleClass('open');
    });
}

function searchMore() {	
	$('#searchToggle').keydown(function(event){    
	    if(event.keyCode==13){
	       $('#searchToggle').trigger('click');
	    }
	});		
	
	$('#searchToggle').click(function() {
	    $(this).toggleClass('on');
	    $('#searchWrap').toggleClass('open');
	});
}


// From Degrees to Careers Blocks - mobi and large
function degreePop() {
  $('.degreePop h5').click(function() {
	  	$(this).toggleClass('on').next().toggleClass('open');
    });
}

function degreeTabs() {	
	$('.degreeTriggers a').click(function(event) {
	    $(this).parent().addClass('on');
	    $(this).parent().siblings().removeClass('on');
	    
	    var tab = $(this).attr('href');
	    $('.degreePop').not(tab).css('display', 'none');
	    $(tab).show();
	    event.preventDefault();
	});
}

function degreeTitle() {	
	$('.degreeContent').prepend('<div class="titlePut"></p>');
	$('.titlePut').html($('.titleContain').html());
}

// Advanced Calendar Views on general pages
// this is NOT the main calendar! 
function eventTabs() {	
	$('.eventTriggers a').click(function(event) {	    
	    $(this).parent().addClass('on');
	    $(this).parent().siblings().removeClass('on');
	    
	    var tab = $(this).attr('href');
	    $('.eventPop').not(tab).css('display', 'none');
	    $(tab).show();
	    event.preventDefault();
	});
}

// Using isotope for faculty listings
function filterFaculty() {
	
	var $container = $('#facultyList').isotope({
    	itemSelector: 'li',
    	layoutMode: 'fitRows',
    	
    	getSortData: {
		  lastName: '.lastName'
	  	},
	  
	  	sortBy: 'lastName'
	  
  	});
  	
  	var iso = $container.data('isotope');
  
	 $container.isotope( 'on', 'layoutComplete', function() {
	    // add/remove odd class
	    $.each( iso.filteredItems, function( i, item ) {
	      var method = i % 2 ? 'removeClass' : 'addClass';
	      $( item.element )[ method ]('odd');
	    }); 
	  });
	  
	  $container.isotope( 'on', 'arrangeComplete', function() {
	    $('#results').html(iso.filteredItems.length + ' items found.');
	    $('#results').attr('tabindex','-1').focus();
	    $('.element-item').removeAttr('tabindex');
	    for (var i=0; i<iso.filteredItems.length;i++) {
	      $(iso.filteredItems[i].element).attr('tabindex',0);
	    }
	    
	  });
  	
  	$('#facultySort').on( 'click', 'span', function() {
		
		$('#facultySort span').removeClass('active');
        $(this).addClass('active');		
		
		var filterValue = $(this).attr('data-filter');
			$container.isotope({ filter: filterValue });
	});
	
	if ($('#facultyList').length > 0) { 
	    iso.layout();  // have to trigger this immediately to add the alt classes.  not sure why.
	}	
}

function showHide() {
	$('.showHide .selector span').click(function() {
        $('.showHide .showHideView').toggleClass('open');
        $(this).toggleClass('on');
    });
}

function responsiveVids() {
	$('.videoEmbed').fitVids();
}

function slickSlider() {	
	var $pageInfo = $('.pagingInfo');
	var $slickElement = $('.photoGallery');
	
	$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $pageInfo.html('<i>' + i + '</i>' + ' of ' + slick.slideCount);
    });
	
	$slickElement.slick({
	   dots: false,
	   infinite: false,
	   speed: 500,
	   fade: true,
	   cssEase: 'linear'
	});
}

// Equalize the Rows of Resources for floating purposes
function equalHeight() {
	$('.eventList li').matchHeight();
	$('.blandNewsList li').matchHeight();
	$('.abbrStoryList li').matchHeight();
	$('.multiList li').matchHeight();
}

/* On Document Ready */
$(document).ready(function() {
	homepageBCookie();
	
	priorityNavGo();
	searchMore();
	mobiMore();
	showMore();
	subNavMore();
	
	filterFaculty();
	
	showHide();
	
	degreePop();
	degreeTabs();
	degreeTitle();
	
	eventTabs();
	
	responsiveVids();
	slickSlider();
	
	equalHeight();
});
