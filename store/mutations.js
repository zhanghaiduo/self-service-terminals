export default {
	INIT(state) {
		state.Log = plus.android.importClass("android.util.Log");
		state.DeviceAbility = plus.android.importClass("com.i3020.nativable.DeviceAbility").getInstace();
	},
// 	USE_ANDROID_CLASS(state,data){
// 		console.log(data)
// 	}
}
