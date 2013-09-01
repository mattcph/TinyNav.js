/*! http://tinynav.viljamis.com v1.1 by @viljamis */
(function ($, window, i) {
    $.fn.tinyNav = function (options) {

    // Default settings
        var settings = $.extend({
          'active' : 'active', // String: Set the "active" class
          'header' : '', // String: Specify text for "header"
          'allheader' : false, // Boolean: removes the active selected on header
          'label'  : '', // String: sets the <label> text for the <select> (if not set, no label will be added)
          'domObj' : '' // find the dom object to contain the select
        }, options);

        return this.each(function () {
        i++;
          // Used for namespacing
        var $nav = $(this),
            // Namespacing
            namespace = 'tinynav',
            namespace_i = namespace + i,
            l_namespace_i = '.l_' + namespace_i,
            $select = $('<select/>').attr("id", namespace_i).addClass(namespace + ' ' + namespace_i);

        if ($nav.is('ul,ol')) {

            // Build options
            var options = '';
            var disabled = '';

            $nav.addClass('l_' + namespace_i)
            .find('a')
            .each(function () {
                disabled = $(this).attr('class') || "";
                options += '<option '+disabled+' value="' + $(this).attr('href') + '">';
                var j;
                for (j = 0; j < $(this).parents('ul, ol').length - 1; j++) {
                    options += '- ';
                }
                options += $(this).text() + '</option>';
            });

            // Append options into a select
            $select.append(options);

            // Select the active item
            if (!settings.allheader) {
            // is anything active?
                if($(l_namespace_i + ' li.' + settings.active).length) {
                    $select
                    .find(':eq(' + $(l_namespace_i + ' li')
                    .index($(l_namespace_i + ' li.' + settings.active)) + ')')
                    .attr('selected', true);
                }
            }
            //add the header at the end to avoid select index count issue and add a parent path as this is possibly a child list
            if (settings.header !== '') {
                var path = window.location.pathname;
                path = path.substring(0, path.lastIndexOf("/"));
                $select.prepend($('<option/>').val("path")
                .text(settings.header)
                .addClass("tinyNavSelectHeader"));
            }
            // Change window location
            $select.change(function () {
              window.location.href = $(this).val();
            });

            // Inject select and use own dom element to append into
            $(l_namespace_i).after($select);
            if(i===1) {
                if (settings.domObj) {
                    $(settings.domObj).append($('#tinynav1'));
                }
            }

            // Inject label
            if (settings.label) {
                $select.before(
                $("<label/>")
                  .attr("for", namespace_i)
                  .addClass(namespace + '_label ' + namespace_i + '_label')
                  .append(settings.label)
                );
            }

          }

        });
  };

})(jQuery, this, 0);

