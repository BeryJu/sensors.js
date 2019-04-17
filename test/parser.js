const {expect} = require("chai");
const {parser} = require("../lm-sensors");

function line(what){
	beforeEach(function () {
		this.lines.push(what);
	})
}
function parse(){
	beforeEach(function () {
		this.result = parser(this.lines.join("\n"));
	})
}

describe("parser", function(){
	describe("Given an empty input", function(){
		it("produces an empty result set", function(){
			const resultSet = parser("");
			expect(resultSet).to.deep.eq({});
		});
	});

	describe("Given a single device", function(){
		beforeEach(function () {
			this.lines = [ "coretemp-isa-0000" ];
		});

		describe("With no attributes", function(){
			parse();

			it("registers the device", function(){
				expect(this.result).to.deep.eq({"coretemp-isa-0000": {} });
			});
		});

		describe("With an adapter", function(){
			line("Adapter: ISA adapter");
			parse();

			it("registers the device", function(){
				expect(this.result).to.deep.eq({"coretemp-isa-0000": {"ISA adapter" : {}} });
			});
		});
	})

	describe("Given an example CPU core temp", function () {
		const device = "coretemp-isa-0001";
		const adapter = "ISA adapter";
		beforeEach(function () {
			this.lines = [
				device,
				"Adapter: " + adapter,
				"Core 0:       +25.0°C  (high = +79.0°C, crit = +89.0°C)",
				"Core 1:       +24.0°C  (high = +79.0°C, crit = +89.0°C)",
				"Core 2:       +23.0°C  (high = +79.0°C, crit = +89.0°C)",
				"Core 8:       +23.0°C  (high = +79.0°C, crit = +89.0°C)",
				"Core 9:       +25.0°C  (high = +79.0°C, crit = +89.0°C)",
				"Core 10:      +26.0°C  (high = +79.0°C, crit = +89.0°C)",
			];
		});
		parse();

		it("registers the device", function(){
			expect(Object.keys(this.result)).to.include("coretemp-isa-0001");
		});
		it("registers the adapter", function(){
			expect(Object.keys(this.result[device])).to.include("ISA adapter");
		});
		it("registers the sensors", function(){
			expect(Object.keys(this.result[device][adapter])).to.include("Core 10");
		});
		it("registers the a temperature", function(){
			expect(this.result[device][adapter]["Core 1"].value).to.eq(24);
		});
	});
});
