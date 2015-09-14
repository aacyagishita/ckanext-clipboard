/*!
 * ckanext-clipboard
 * Copyright(c) Georepublic
 */

ckan.module('clipboard-cart', function (jQuery, _) {
  return {

    options: {
      i18n: {
        added: _('Added resource "%(resource)s" to Clipboard.'),
        empty: _('There are currently no items in your clipboard.')
      }
    },

    // Popover status
    visible: false,

    // Resources in clipboard
    clipboard: {
      "resources": []
    },

    // Popover
    target: jQuery('li a[data-toggle="popover"]'),

    initialize: function () {

      if(typeof(Storage) === "undefined") {
        console.log("Local storage not supported!")
        exit;
      }

      jQuery.proxyAll(this, /_on/);
      this.sandbox.subscribe('add-resource', this._onResource);

      // Read existing storage "ckan_clipboard"
      var storage = localStorage.getItem('ckan_clipboard');

      // 150904 aac update
      //if (storage) {
      if (storage != "{}" && storage != null )
      {
        this.clipboard = JSON.parse(storage);
        this._render();
      }
    },

    teardown: function () {
      // Called before a module is removed from the page.
      this.sandbox.unsubscribe('add-resource', this._onResource);
    },

    _render: function () {
      this._badge();
      this._cart();
    },

    // Update badge
    _badge: function () {
      this.target.children('span.badge').html(this.clipboard.resources.length);
    },

    _cart: function () {
      // Default content
      var content = this.i18n('empty');
      this.target.popover('destroy');

      // Replace with resources list
      var list = [];
      list.push('<ul>');

      jQuery.each(this.clipboard.resources, function (position,resource) {
        list.push('<li>');
        list.push('<button class="close pull-right" data-resource="' +
          resource.id + '">&times;</button>');
        list.push(resource.name + ' (' + resource.format + ')');
        list.push('</li>');
      });

      list.push('</list>');

      if(list.length > 2) {
        content = list.join('');
      }

      // Enable Popover with close button to remove items
      var cart = this;
      this.target.popover({
        html: true,
        content: content
      }).parent().on('click', 'button.close', function (evt) {

        // Filter out objects with this resource ID
        var id = $(this).attr('data-resource');
        cart.clipboard.resources = $.grep(cart.clipboard.resources, function (resource) {
          return resource.id != id;
        });

        cart.visible = true;
        cart._setStorage();
        cart._render();
      });

      if (this.visible) {
        this.target.popover('show');
        cart.visible = false; // Not sure this is necessary
      }
    },

    _setStorage: function () {
      localStorage.setItem('ckan_clipboard', JSON.stringify(this.clipboard));
    },

    _onResource: function (resource) {
      var message = this.i18n('added', {"resource": resource.name});
      // this.sandbox.notify(message, 'success');

      // Check if resource is already in the clipboard
      var find = $.grep(this.clipboard.resources, function (items) {
        return items.id == resource.id;
      });

      // Only add new resource to clipboard
      if (find.length === 0) {
        this.clipboard.resources.push(resource);
        this._setStorage();
        this._render();
      }
    }
  }
});

ckan.module('clipboard-resource', function (jQuery, _) {
  return {
    // 150904 aac update
    options: {
      id: '',
      name: '',
      format: '',
      url: '',
      i18n: {}
    },

    initialize: function () {
      jQuery.proxyAll(this, /_on/);
      this.button = this.$('button');
      this.button.on('click', this._onClick);
    },

    teardown: function () {
      // Called before a module is removed from the page.
    },

    _onClick: function (evt) {
      evt.preventDefault();
      // 150904 aac update
      var resource =
      this.sandbox.publish('add-resource', {
        "id": this.options.id,
        "name": this.options.name,
        "format": this.options.format,
        "url": this.options.url
      });
    }
  }
});
