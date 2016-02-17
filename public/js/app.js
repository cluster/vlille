var bus = _.extend({}, Backbone.Events);

var Station = Backbone.Model.extend({
  urlRoot: "/api/stations"
});

var Stations = Backbone.Collection.extend({
  model: Station,
  url: "/api/stations"
});

var StationDetailView = Backbone.View.extend({
  el: "#station-details",
  initialize: function(options){
    this.bus = options.bus;
    this.bus.on("stationSelected", this.onStationSelected, this);
  },
  onStationSelected: function(station){
    var self = this;
    this.model = station;
    //self.render();
    this.model.fetch({
      success: function(){
        self.render();
      }
    });
  },
  render: function(){
    if(this.model){
      this.$el.html("station:" + this.model.get("name") + " bikes" + this.model.get("bikes") + " attachs : " + this.model.get("attachs"));
    }
  }
});

var StationView = Backbone.View.extend({
  initialize: function(options){
    this.bus = options.bus;
  },
  events: {
    "click": "onStationClick"
  },
  tagName: "li",
  onStationClick: function(e){
    this.bus.trigger("stationSelected", this.model/*e.target.id*/);
  },
  render: function(){
    this.$el.html(this.model.get("name"));
    this.$el.attr({id: this.model.id});
    return this;
  }
});

var StationsView = Backbone.View.extend({
  tagName: "ul",
  initialize: function(options){
    this.bus = options.bus;
    this.model.on('add', this.onAddStation, this);
  },
  onAddStation: function(station){
    var view = new StationView({model: station, bus:this.bus});
    this.$el.append(view.render().$el);
  },
  render: function(){
    var self = this;
    console.log(this.model);
    this.model.each(function(station){
      var stationView = new StationView({model:station, bus: self.bus});
      self.$el.append(stationView.render().$el);
    });
  }
});
var stations = new Stations({
  success: function(){
    stationsView.render();
  }
});
stations.fetch();
var stationsView = new StationsView({el:"#stations", model:stations, bus: bus});
var stationDetailView = new StationDetailView({bus: bus});
