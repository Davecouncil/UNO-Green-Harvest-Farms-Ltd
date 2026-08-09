import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Button from "../components/ui/Button";
import { FiCheck, FiChevronRight, FiTruck } from "react-icons/fi";

const paymentMethods = [
  { id: "flutterwave", label: "Flutterwave" },
  { id: "paystack", label: "Paystack" },
];

const DELIVERY_FEE = 1750;

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, itemCount } = useCart();

  const items = cart?.items || [];

  const itemsTotal = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const total = itemsTotal + DELIVERY_FEE;

  const [activeStep, setActiveStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
  });
  const [selectedPayment, setSelectedPayment] = useState("flutterwave");
  const [promoCode, setPromoCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmAddress = (e) => {
    e.preventDefault();
    setActiveStep(2);
  };

  const handleConfirmDelivery = () => {
    setActiveStep(3);
  };

  const handlePlaceOrder = () => {
    setSubmitting(true);

    // Not wired to a real payment/order flow yet — placeholder until
    // Flutterwave/Paystack keys and an Order backend exist.
    console.log("Order details:", { address, selectedPayment, items, total });

    setTimeout(() => {
      setSubmitting(false);
      alert("This is a UI placeholder — real payment isn't connected yet.");
    }, 1000);
  };

  const addressComplete = address.fullName && address.phone && address.street && address.city && address.state;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-4">
        <p className="font-dm text-2xl text-gray-800 mb-2">Your cart is empty</p>
        <p className="text-gray-500 text-sm mb-6">Add items before checking out.</p>
        <Button variant="secondary" onClick={() => navigate("/products")}>
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">

      <h1 className="font-dm text-2xl text-gray-900 mb-8">Place Your Order</h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left: Steps */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Step 1: Address */}
          <div className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeStep > 1 && addressComplete
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {activeStep > 1 && addressComplete ? <FiCheck size={13} /> : "1"}
                </span>
                <h2 className="font-semibold text-gray-900 text-sm">
                  Customer Address
                </h2>
              </div>

              {activeStep !== 1 && addressComplete && (
                <button
                  onClick={() => setActiveStep(1)}
                  className="text-[#2D7A0F] text-sm font-medium flex items-center gap-1 hover:underline"
                >
                  Change <FiChevronRight size={14} />
                </button>
              )}
            </div>

            {activeStep === 1 ? (
              <form onSubmit={handleConfirmAddress} className="mt-4 grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={address.fullName}
                    onChange={handleAddressChange}
                    required
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleAddressChange}
                    required
                    placeholder="080XXXXXXXX"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    required
                    placeholder="1247 Green Valley Road"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">City</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    required
                    placeholder="Port Harcourt"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">State</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    required
                    placeholder="Rivers"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Button type="submit" variant="secondary">
                    Save Address
                  </Button>
                </div>
              </form>
            ) : (
              addressComplete && (
                <div className="mt-3 flex items-start gap-3 border border-gray-100 rounded-lg p-3 bg-gray-50">
                  <FiTruck className="text-gray-400 mt-0.5" size={16} />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium">{address.fullName}</p>
                    <p className="text-gray-500">
                      {address.street}, {address.city} - {address.state} | +{address.phone}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Step 2: Delivery */}
          <div
            className={`border border-gray-200 rounded-xl p-5 ${
              activeStep < 2 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeStep > 2 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {activeStep > 2 ? <FiCheck size={13} /> : "2"}
                </span>
                <h2 className="font-semibold text-gray-900 text-sm">
                  Delivery Details
                </h2>
              </div>

              {activeStep > 2 && (
                <button
                  onClick={() => setActiveStep(2)}
                  className="text-[#2D7A0F] text-sm font-medium flex items-center gap-1 hover:underline"
                >
                  Change <FiChevronRight size={14} />
                </button>
              )}
            </div>

            {activeStep === 2 && (
              <div className="mt-4">
                <div className="border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="font-medium text-sm mb-1">Door Delivery</p>
                  <p className="text-xs text-gray-500">
                    Estimated delivery within 2–3 business days.
                  </p>
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  Shipment: {itemCount} item{itemCount > 1 ? "s" : ""} — fulfilled by UNO Green Harvest
                </p>

                <Button variant="secondary" onClick={handleConfirmDelivery}>
                  Continue to Payment
                </Button>
              </div>
            )}

            {activeStep > 2 && (
              <div className="mt-3 flex items-start gap-3 border border-gray-100 rounded-lg p-3 bg-gray-50">
                <FiTruck className="text-gray-400 mt-0.5" size={16} />
                <p className="text-sm text-gray-700">Door Delivery — 2–3 business days</p>
              </div>
            )}
          </div>

          {/* Step 3: Payment */}
          <div
            className={`border border-gray-200 rounded-xl p-5 ${
              activeStep < 3 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  activeStep >= 3 ? "bg-gray-200 text-gray-500" : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </span>
              <h2 className="font-semibold text-gray-900 text-sm">
                Payment Method
              </h2>
            </div>

            {activeStep === 3 && (
              <div className="mt-4 flex flex-col gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedPayment(method.id)}
                    className={`flex items-center justify-between border rounded-xl px-4 py-3.5 transition ${
                      selectedPayment === method.id
                        ? "border-[#2D7A0F] bg-[#F4F8F1]"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-800">{method.label}</span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        selectedPayment === method.id
                          ? "border-[#2D7A0F] bg-[#2D7A0F]"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedPayment === method.id && <FiCheck size={12} className="text-white" />}
                    </span>
                  </button>
                ))}

                <p className="text-xs text-gray-400 mt-1">
                  Payment is not yet connected — placeholder until API keys are provided.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-xl p-6 sticky top-32">
            <h2 className="font-dm text-lg mb-4">Order Summary</h2>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Item's total ({itemCount})</span>
              <span>₦{itemsTotal.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
              <span>Delivery Fee</span>
              <span>₦{DELIVERY_FEE.toLocaleString()}</span>
            </div>

            <div className="border-t border-gray-200 pt-3 flex items-center justify-between font-semibold text-gray-900 mb-5">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>

            <div className="flex gap-2 mb-5">
              <input
                type="text"
                placeholder="Enter code here"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2D7A0F] transition"
              />
              <button
                type="button"
                className="text-sm font-medium text-gray-400"
              >
                Apply
              </button>
            </div>

            <Button
              variant="primary"
              className="w-full"
              disabled={activeStep < 3}
              loading={submitting}
              onClick={handlePlaceOrder}
            >
              Confirm Order
            </Button>

            <p className="text-xs text-gray-400 mt-4 text-center">
              By proceeding, you agree to the Terms & Conditions.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}