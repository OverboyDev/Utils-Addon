const SDK = self.SDK

const PLUGIN_CLASS = SDK.Plugins.Overboy_Utils

PLUGIN_CLASS.Instance = class MyCustomInstance extends SDK.IInstanceBase {
	constructor(sdkType, inst) {
		super(sdkType, inst)
	}

	Release() {}

	OnCreate() {}

	OnPropertyChanged(id, value) {}

	LoadC2Property(name, valueString) {
		return false // not handled
	}
}
