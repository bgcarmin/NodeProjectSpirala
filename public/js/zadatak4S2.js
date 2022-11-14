let assert = chai.assert;

describe('porediRezultate()', function() {
    it('treba vratiti 0% jer su isti testovi, a svi padaju u rezultat2', function() {
        var objekat = TestoviParser.porediRezultate("{\n  \"stats\": {\n\t\"suites\": 2,\n\t\"tests\": 2,\n\t\"passes\": 2,\n\t\"pending\": 0,\n\t\"failures\": 0,\n\t\"start\": \"2021-11-05T15:00:26.343Z\",\n\t\"end\": \"2021-11-05T15:00:26.352Z\",\n\t\"duration\": 9\n  },\n  \"tests\": [\n\t{\n  \t\"title\": \"should draw 3 rows when parameter are 2,3\",\n  \t\"fullTitle\": \"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\n  \t\"file\": null,\n  \t\"duration\": 1,\n  \t\"currentRetry\": 0,\n  \t\"speed\": \"fast\",\n  \t\"err\": {}\n\t},\n\t{\n  \t\"title\": \"should draw 2 columns in row 2 when parameter are 2,3\",\n  \t\"fullTitle\": \"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\n  \t\"file\": null,\n  \t\"duration\": 0,\n  \t\"currentRetry\": 0,\n  \t\"speed\": \"fast\",\n    \"err\": {}\n  }\n  ],\n  \"pending\": [],\n  \"failures\": [],\n  \"passes\": [\n  {\n    \"title\": \"should draw 3 rows when parameter are 2,3\",\n    \"fullTitle\": \"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"should draw 2 columns in row 2 when parameter are 2,3\",\n    \"fullTitle\": \"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\n    \"file\": null,\n    \"duration\": 0,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ]\n}",
        "{\n  \"stats\": {\n\t\"suites\": 2,\n\t\"tests\": 2,\n\t\"passes\": 0,\n\t\"pending\": 0,\n\t\"failures\": 2,\n\t\"start\": \"2021-11-05T15:00:26.343Z\",\n\t\"end\": \"2021-11-05T15:00:26.352Z\",\n\t\"duration\": 9\n  },\n  \"tests\": [\n\t{\n  \t\"title\": \"should draw 3 rows when parameter are 2,3\",\n  \t\"fullTitle\": \"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\n  \t\"file\": null,\n  \t\"duration\": 1,\n  \t\"currentRetry\": 0,\n  \t\"speed\": \"fast\",\n  \t\"err\": {}\n\t},\n\t{\n  \t\"title\": \"should draw 2 columns in row 2 when parameter are 2,3\",\n  \t\"fullTitle\": \"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\n  \t\"file\": null,\n  \t\"duration\": 0,\n  \t\"currentRetry\": 0,\n  \t\"speed\": \"fast\",\n    \"err\": {}\n  }\n  ],\n  \"pending\": [],\n  \"failures\": [\n  {\n    \"title\": \"should draw 3 rows when parameter are 2,3\",\n    \"fullTitle\": \"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"should draw 2 columns in row 2 when parameter are 2,3\",\n    \"fullTitle\": \"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\n    \"file\": null,\n    \"duration\": 0,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ],\n  \"passes\": []\n}");
        var jsonRezultat = JSON.stringify(objekat);
        assert.equal(jsonRezultat,'{"promjena":"0%","greske":["Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","Tabela crtaj() should draw 3 rows when parameter are 2,3"]}',"porediRezultate() treba vratiti 0% jer su isti testovi, a svi padaju u rezultat2");
    });
    it('treba vratiti 100% jer su isti testovi, a svi prolaze u rezultat2', function() {
        var objekat = TestoviParser.porediRezultate("{\n  \"stats\": {\n\t\"suites\": 2,\n\t\"tests\": 2,\n\t\"passes\": 0,\n\t\"pending\": 0,\n\t\"failures\": 2,\n\t\"start\": \"2021-11-05T15:00:26.343Z\",\n\t\"end\": \"2021-11-05T15:00:26.352Z\",\n\t\"duration\": 9\n  },\n  \"tests\": [\n\t{\n  \t\"title\": \"should draw 3 rows when parameter are 2,3\",\n  \t\"fullTitle\": \"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\n  \t\"file\": null,\n  \t\"duration\": 1,\n  \t\"currentRetry\": 0,\n  \t\"speed\": \"fast\",\n  \t\"err\": {}\n\t},\n\t{\n  \t\"title\": \"should draw 2 columns in row 2 when parameter are 2,3\",\n  \t\"fullTitle\": \"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\n  \t\"file\": null,\n  \t\"duration\": 0,\n  \t\"currentRetry\": 0,\n  \t\"speed\": \"fast\",\n    \"err\": {}\n  }\n  ],\n  \"pending\": [],\n  \"failures\": [\n  {\n    \"title\": \"should draw 3 rows when parameter are 2,3\",\n    \"fullTitle\": \"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"should draw 2 columns in row 2 when parameter are 2,3\",\n    \"fullTitle\": \"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\n    \"file\": null,\n    \"duration\": 0,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ],\n  \"passes\": []\n}",
        "{\n  \"stats\": {\n\t\"suites\": 2,\n\t\"tests\": 2,\n\t\"passes\": 2,\n\t\"pending\": 0,\n\t\"failures\": 0,\n\t\"start\": \"2021-11-05T15:00:26.343Z\",\n\t\"end\": \"2021-11-05T15:00:26.352Z\",\n\t\"duration\": 9\n  },\n  \"tests\": [\n\t{\n  \t\"title\": \"should draw 3 rows when parameter are 2,3\",\n  \t\"fullTitle\": \"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\n  \t\"file\": null,\n  \t\"duration\": 1,\n  \t\"currentRetry\": 0,\n  \t\"speed\": \"fast\",\n  \t\"err\": {}\n\t},\n\t{\n  \t\"title\": \"should draw 2 columns in row 2 when parameter are 2,3\",\n  \t\"fullTitle\": \"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\n  \t\"file\": null,\n  \t\"duration\": 0,\n  \t\"currentRetry\": 0,\n  \t\"speed\": \"fast\",\n    \"err\": {}\n  }\n  ],\n  \"pending\": [],\n  \"failures\": [],\n  \"passes\": [\n  {\n    \"title\": \"should draw 3 rows when parameter are 2,3\",\n    \"fullTitle\": \"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"should draw 2 columns in row 2 when parameter are 2,3\",\n    \"fullTitle\": \"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\n    \"file\": null,\n    \"duration\": 0,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ]\n}\n");
        var jsonRezultat = JSON.stringify(objekat);
        assert.equal(jsonRezultat,'{"promjena":"100%","greske":[]}',"porediRezultate() treba vratiti 100% jer su isti testovi, a svi prolaze u rezultat2");
    });
    it('treba vratiti 50%, nisu svi isti testovi, a jedan je test ispravljen', function() {
        var objekat = TestoviParser.porediRezultate("{\n  \"stats\": {\n\t\"suites\": 2,\n\t\"tests\": 3,\n\t\"passes\": 1,\n\t\"pending\": 0,\n\t\"failures\": 2,\n\t\"start\": \"2021-11-05T15:00:26.343Z\",\n\t\"end\": \"2021-11-05T15:00:26.352Z\",\n\t\"duration\": 9\n  },\n  \"tests\": [\n\t{\n  \t\"title\": \"prvi test\",\n  \t\"fullTitle\": \"porediRezultate() prvi test\",\n  \t\"file\": null,\n  \t\"duration\": 1,\n  \t\"currentRetry\": 0,\n  \t\"speed\": \"fast\",\n  \t\"err\": {}\n\t},\n  {\n    \"title\": \"drugi test\",\n    \"fullTitle\": \"porediRezultate() drugi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"treci test\",\n    \"fullTitle\": \"porediRezultate() treci test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ],\n  \"pending\": [],\n  \"failures\": [\n  {\n    \"title\": \"prvi test\",\n    \"fullTitle\": \"porediRezultate() prvi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"treci test\",\n    \"fullTitle\": \"porediRezultate() treci test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }  \n  ],\n  \"passes\": [\n  {\n    \"title\": \"drugi test\",\n    \"fullTitle\": \"porediRezultate() drugi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ]\n}",
        "{\n  \"stats\": {\n\t\"suites\": 2,\n\t\"tests\": 3,\n\t\"passes\": 2,\n\t\"pending\": 0,\n\t\"failures\": 1,\n\t\"start\": \"2021-11-05T15:00:26.343Z\",\n\t\"end\": \"2021-11-05T15:00:26.352Z\",\n\t\"duration\": 9\n  },\n  \"tests\": [\n\t{\n  \t\"title\": \"prvi test\",\n  \t\"fullTitle\": \"porediRezultate() prvi test\",\n  \t\"file\": null,\n  \t\"duration\": 1,\n  \t\"currentRetry\": 0,\n  \t\"speed\": \"fast\",\n  \t\"err\": {}\n\t},\n  {\n    \"title\": \"drugi test\",\n    \"fullTitle\": \"porediRezultate() drugi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"cetvrti test\",\n    \"fullTitle\": \"porediRezultate() cetvrti test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ],\n  \"pending\": [],\n  \"failures\": [\n  {\n    \"title\": \"drugi test\",\n    \"fullTitle\": \"porediRezultate() drugi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }  \n  ],\n  \"passes\": [\n  {\n    \"title\": \"prvi test\",\n    \"fullTitle\": \"porediRezultate() prvi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"cetvrti test\",\n    \"fullTitle\": \"porediRezultate() cetvrti test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ]\n}");
        var jsonRezultat = JSON.stringify(objekat);
        assert.equal(jsonRezultat,'{"promjena":"50%","greske":["porediRezultate() treci test","porediRezultate() drugi test"]}',"porediRezultate() treba vratiti 50%, nisu svi isti testovi, a jedan je test ispravljen");
    });
    it('treba vratiti 85.7%, nisu svi isti testovi, a treba pravilno sortirati testove', function() {
        var objekat = TestoviParser.porediRezultate("{\n  \"stats\": {\n\t\"suites\": 2,\n\t\"tests\": 4,\n\t\"passes\": 1,\n\t\"pending\": 0,\n\t\"failures\": 3,\n\t\"start\": \"2021-11-05T15:00:26.343Z\",\n\t\"end\": \"2021-11-05T15:00:26.352Z\",\n\t\"duration\": 9\n  },\n  \"tests\": [\n\t{\n  \t\"title\": \"prvi test\",\n  \t\"fullTitle\": \"porediRezultate() prvi test\",\n  \t\"file\": null,\n  \t\"duration\": 1,\n  \t\"currentRetry\": 0,\n  \t\"speed\": \"fast\",\n  \t\"err\": {}\n\t},\n  {\n    \"title\": \"drugi test\",\n    \"fullTitle\": \"porediRezultate() drugi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"treci test\",\n    \"fullTitle\": \"porediRezultate() treci test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"cetvrti test\",\n    \"fullTitle\": \"porediRezultate() cetvrti test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ],\n  \"pending\": [],\n  \"failures\": [\n  {\n    \"title\": \"prvi test\",\n    \"fullTitle\": \"porediRezultate() prvi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"treci test\",\n    \"fullTitle\": \"porediRezultate() treci test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"cetvrti test\",\n    \"fullTitle\": \"porediRezultate() cetvrti test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }  \n  ],\n  \"passes\": [\n  {\n    \"title\": \"drugi test\",\n    \"fullTitle\": \"porediRezultate() drugi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ]\n}",
        "{\n  \"stats\": {\n\t\"suites\": 2,\n\t\"tests\": 4,\n\t\"passes\": 1,\n\t\"pending\": 0,\n\t\"failures\": 3,\n\t\"start\": \"2021-11-05T15:00:26.343Z\",\n\t\"end\": \"2021-11-05T15:00:26.352Z\",\n\t\"duration\": 9\n  },\n  \"tests\": [\n\t{\n  \t\"title\": \"peti test\",\n  \t\"fullTitle\": \"porediRezultate() peti test\",\n  \t\"file\": null,\n  \t\"duration\": 1,\n  \t\"currentRetry\": 0,\n  \t\"speed\": \"fast\",\n  \t\"err\": {}\n\t},\n  {\n    \"title\": \"drugi test\",\n    \"fullTitle\": \"porediRezultate() drugi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"sesti test\",\n    \"fullTitle\": \"porediRezultate() sesti test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"sedmi test\",\n    \"fullTitle\": \"porediRezultate() sedmi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ],\n  \"pending\": [],\n  \"failures\": [\n  {\n    \"title\": \"peti test\",\n    \"fullTitle\": \"porediRezultate() peti test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"sesti test\",\n    \"fullTitle\": \"porediRezultate() sesti test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"sedmi test\",\n    \"fullTitle\": \"porediRezultate() sedmi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }  \n  ],\n  \"passes\": [\n  {\n    \"title\": \"drugi test\",\n    \"fullTitle\": \"porediRezultate() drugi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ]\n}");
        var jsonRezultat = JSON.stringify(objekat);
        assert.equal(jsonRezultat,'{"promjena":"85.7%","greske":["porediRezultate() cetvrti test","porediRezultate() prvi test","porediRezultate() treci test","porediRezultate() peti test","porediRezultate() sedmi test","porediRezultate() sesti test"]}',"porediRezultate() treba vratiti 85.7%, nisu svi isti testovi, a treba pravilno sortirati testove");
    });
    it('treba vratiti 33.3%, isti su testovi, ali su u drugom redoslijedu', function() {
        var objekat = TestoviParser.porediRezultate("{\n  \"stats\": {\n\t\"suites\": 2,\n\t\"tests\": 3,\n\t\"passes\": 1,\n\t\"pending\": 0,\n\t\"failures\": 2,\n\t\"start\": \"2021-11-05T15:00:26.343Z\",\n\t\"end\": \"2021-11-05T15:00:26.352Z\",\n\t\"duration\": 9\n  },\n  \"tests\": [\n\t{\n  \t\"title\": \"prvi test\",\n  \t\"fullTitle\": \"porediRezultate() prvi test\",\n  \t\"file\": null,\n  \t\"duration\": 1,\n  \t\"currentRetry\": 0,\n  \t\"speed\": \"fast\",\n  \t\"err\": {}\n\t},\n  {\n    \"title\": \"drugi test\",\n    \"fullTitle\": \"porediRezultate() drugi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"treci test\",\n    \"fullTitle\": \"porediRezultate() treci test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ],\n  \"pending\": [],\n  \"failures\": [\n  {\n    \"title\": \"prvi test\",\n    \"fullTitle\": \"porediRezultate() prvi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"treci test\",\n    \"fullTitle\": \"porediRezultate() treci test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }  \n  ],\n  \"passes\": [\n  {\n    \"title\": \"drugi test\",\n    \"fullTitle\": \"porediRezultate() drugi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ]\n}",
        "{\n  \"stats\": {\n  \"suites\": 2,\n  \"tests\": 3,\n  \"passes\": 1,\n  \"pending\": 0,\n  \"failures\": 2,\n  \"start\": \"2021-11-05T15:00:26.343Z\",\n  \"end\": \"2021-11-05T15:00:26.352Z\",\n  \"duration\": 9\n  },\n  \"tests\": [\n  {\n    \"title\": \"treci test\",\n    \"fullTitle\": \"porediRezultate() treci test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"drugi test\",\n    \"fullTitle\": \"porediRezultate() drugi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },\n  {\n    \"title\": \"prvi test\",\n    \"fullTitle\": \"porediRezultate() prvi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ],\n  \"pending\": [],\n  \"failures\": [\n  {\n    \"title\": \"treci test\",\n    \"fullTitle\": \"porediRezultate() treci test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  },  \n  {\n    \"title\": \"prvi test\",\n    \"fullTitle\": \"porediRezultate() prvi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ],\n  \"passes\": [\n  {\n    \"title\": \"drugi test\",\n    \"fullTitle\": \"porediRezultate() drugi test\",\n    \"file\": null,\n    \"duration\": 1,\n    \"currentRetry\": 0,\n    \"speed\": \"fast\",\n    \"err\": {}\n  }\n  ]\n}");
        var jsonRezultat = JSON.stringify(objekat);
        assert.equal(jsonRezultat,'{"promjena":"33.3%","greske":["porediRezultate() prvi test","porediRezultate() treci test"]}',"porediRezultate() treba vratiti 33.3%, isti su testovi, ali su u drugom redoslijedu");
    });
});