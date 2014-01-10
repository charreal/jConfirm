/*
        jConfirm v.2
        Developed with love by Versatility Werks (http://flwebsites.biz)
        
        What it does:
        jConfirm quickly allows you to add beautiful confirmation messages with callbacks
        
        ** Requires jQuery **
        
        Example Usage:
        
        <a href='#' itemType='product' itemId='1' class='jConfirm'>Delete this Product</a>
        
        $('.jConfirm').jConfirm({
                message: 'You sure you to delete this?',
                confirm: 'YUPPERS',
                cancel: 'NO WAY!',
                attributes: ['itemType', 'itemId'],
                callback: function(elem){
                        $.ajax('delete.php?type='+elem.attr(itemType)+'&id='+elem.attr(itemId), function(data){
                                if(data.success){
                                	alert("YAY, deleted!");
                                }
                                else{
                                	alert("NOPE, failed for some silly reason");
                                }
                        });
                }
        });
        
*/

/* Add the jConfirm div (if not exists) */
 if($('#jConfirm').length < 1){
         $('body').append("<div id='jConfirm'><div style='margin-bottom: 5px;'></div><a class='jYup'></a> <a class='jNope'></a></div>");
         /* Cache it */
         $jConfirmDiv = $('#jConfirm');
 }

/* Indicated whether open or closed to avoid checking clicks if not open */
$jConfirmDivOpen = false;

  $.fn.jConfirm = function(options) {

        /* Set default options */
          var options = $.extend({
                  message: 'Are you sure?',
                confirm: 'Yup',
                cancel: 'Nope',
                attributes: ['href'],
                callback: function(elem){
                        console.log(elem);        
                }
       	   }, options);
        
        /* Cache the dom elements we're attaching to */
          $this = $(this);
        
        /* Show jConfirm when the element is clicked */
        $this.on('click', function(e){
                e.preventDefault();
                $jConfirmDivOpen = true;
                $jConfirmElem = $(this);
                $jConfirmCallback = options.callback;
                var left, top, link;
                left = $jConfirmElem.offset().left;
                top = $jConfirmElem.offset().top + 20;
                link = $jConfirmElem.attr('href');
                $jConfirmDiv.find('div').html(options.message);
                $('.jYup').html(options.confirm);
                $('.jNope').html(options.cancel);
                $jConfirmDiv.css('left',left).css('top',top).slideDown('fast');
    });
}
    /* If clicked the confirm button, run the callback/include the original link's source, and hide jConfirm */
    $jConfirmDiv.on('click', '.jYup', function(e){
            e.preventDefault();
            $jConfirmDiv.hide();
            $jConfirmCallback($jConfirmElem);
    });

        /* If clicked the cancel button, hide jConfirm */
    $jConfirmDiv.on('click', '.jNope', function(e){
            e.preventDefault();
                $jConfirmDivOpen = false;
                   $jConfirmDiv.hide();
    });
    
    /* Close jConfirm if clicked outside it (only caveat, it'll close and reopen if you click another one) */
    $(document).on('mouseup touchend', function(e){
                if($jConfirmDivOpen){
            if (!$jConfirmDiv.is(e.target)
                && $jConfirmDiv.has(e.target).length === 0)
            {
                $jConfirmDiv.slideUp('fast');
            }
                }
        });