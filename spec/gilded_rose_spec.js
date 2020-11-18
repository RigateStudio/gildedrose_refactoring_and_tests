var { Shop, Item } = require('../src/gilded_rose.js');


describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });

  // Test 1
  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  // Test 2
  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  // Test 3
  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  // Test 4
  it("Quand la date de péremption est dépassée, la qualité diminue deux fois plus vite ", function() {
    listItems.push(new Item("+5 Dexterity Vest", 0, 20));
    listItems.push(new Item("Mana Cake", 0, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
        { sellIn: -1, quality: 18 },
        { sellIn: -1, quality: 4 },
    ];
    expected.forEach(function(testCase, idx) {
        expect(items[idx].quality).toBe(testCase.quality);
        expect(items[idx].sellIn).toBe(testCase.sellIn);
    }); 
  });

  // Test 5
  it("La qualité ne peut être inferieure à 0.", function() {
    listItems.push(new Item("+5 Dexterity Vest", 0, 0));
    listItems.push(new Item("Mana Cake", 0, 0));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
        { sellIn: -1, quality: 0 },
        { sellIn: -1, quality: 0 },
    ];
    expected.forEach(function(testCase, idx) {
        expect(items[idx].quality).toBeGreaterThanOrEqual(0);
    });
  });

  // Test 6
  it("La qualité ne peut pas dépasser 50", function() {
    listItems.push(new Item("Aged Brie", 20, 50));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", -4, 50));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
        { sellIn: 19, quality: 50 },
        { sellIn: -5, quality: 50 },
    ];
    expected.forEach(function(testCase, idx) {
        expect(items[idx].quality).toBeLessThanOrEqual(testCase.quality);
    });
  });

  // Test 7
  it("La qualité du légendaire Sulfuras ne doit pas changer", function() {
      listItems.push(new Item('Sulfuras, Hand of Ragnaros', null, 80))

      const gildedRose = new Shop(listItems);
      const items = gildedRose.updateQuality();

      var expected = [
          { sellIn: null, quality: 80 },
      ];
      expected.forEach(function(testCase, idx) {
          expect(items[idx].quality).toBeLessThanOrEqual(testCase.quality);
      });
  });

  // Test 8
  it("La qualité baisse 4 fois plus vite si l'item est Conjured et que sa date de péremption est dépassée", function() {
    listItems.push(new Item("Conjured Mana Cake", -10, 10));
    listItems.push(new Item("Conjured Aged Brie", -1, 10));
    listItems.push(new Item("Conjured Sulfuras, Hand of Ragnaros", null, 80));
    listItems.push(new Item("Conjured Backstage passes to a TAFKAL80ETC concert", -1, 20));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
        { sellIn: -11, quality: 6 },
        { sellIn: -2, quality: 14 },
        { sellIn: null, quality: 80 },
        { sellIn: -2, quality: 0 },
    ];
    expected.forEach(function(testCase, idx) {
        expect(items[idx].quality).toEqual(testCase.quality);
    });
  });
});