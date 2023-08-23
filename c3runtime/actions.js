self.C3.Plugins.Overboy_Utils.Acts = {
	LayerToLayer(layer1, layer2) {
		if (!layer1 || !layer2) {
			return
		}
		//layer1._UpdateZIndices()
		let instances = layer1._GetInstances()
		//console.log("layer instances", instances)
		instances = layer1._GetInstances()
		//console.log("layer instance count", instances.length)
		for (const inst of instances) {
			const wi = inst.GetWorldInfo().ZOrderMoveToLayer(layer2)
			////console.log("wi", wi)
			//wi.ZOrderMoveToLayer(layer2)
		}
	},

	LayerToggleVisible(layer) {
		if (layer) {
			return
		}
		//console.log("My Layer was", myLayer, layer._isVisible)
		myLayer.SetVisible(layer._isVisible)
	},

	ReplaceEventVar(eventVariable, find, replace) {
		if (!eventVariable || typeof eventVariable.GetValue() !== "string") {
			return
		}
		//console.log("eventVariable", eventVariable)
		eventVariable.SetValue(eventVariable.GetValue().replace(new RegExp(C3.EscapeRegex(find), "gi"), replace))
	},

	Log(emoji, category, msg) {
		//console.log("%c" + emoji + " %c" + categ + " %c" + msg, "", "font-weight:bold", "")
	},

	//===== COLOR =====

	SetColor(objectClass, color) {
		const objSol = objectClass.GetCurrentSol()
		let objInstances = objSol.GetInstances()
		if (objInstances.length === 0) return

		const rbgColor = this.colorToRGBValue(color)

		console.log("Set Color To (rgbNumber)", rbgColor)
		console.log("Set Color To (hex)", this.colorToHex(color))

		if (rbgColor === undefined) return

		const tempColor = new C3.Color()
		tempColor.setFromRgbValue(rbgColor)

		for (let i = 0, len = objInstances.length; i < len; ++i) {
			const inst = objInstances[i]
			const wi = inst.GetWorldInfo()
			if (wi.GetUnpremultipliedColor().equalsIgnoringAlpha(tempColor)) return
			wi.SetUnpremultipliedColor(tempColor)
			inst._runtime.UpdateRender()
		}
	},

	ColorTemplate_Set(name, color) {
		name = name.toLowerCase()
		this.colorTemplates[name] = color
	},

	ColorTemplate_Remove(name) {
		name = name.toLowerCase()
		delete this.colorTemplates[name]
	}

	/*
	SetDefaultColor(rgb) {
		tempColor.setFromRgbValue(rgb);
		const wi = this.GetWorldInfo();
		if (wi.GetUnpremultipliedColor().equalsIgnoringAlpha(tempColor)) return;
		wi.SetUnpremultipliedColor(tempColor);
		this._runtime.UpdateRender();
	  }
	  GetColor() {
		const c = this.GetWorldInfo().GetUnpremultipliedColor();
		return C3.PackRGBAEx(c.getR(), c.getG(), c.getB(), c.getA());
	  }
	  PackRGB(red, green, blue) {
		return (
			C3.clamp(red, 0, 255) |
			(C3.clamp(green, 0, 255) << 8) |
			(C3.clamp(blue, 0, 255) << 16)
		);
}
	  */
}
