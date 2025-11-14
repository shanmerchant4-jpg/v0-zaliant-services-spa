"use client"

import { useCart } from "@/context/cart-context"
import { X, Plus, Minus, Trash2 } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, subtotal, discount, total, removeItem, updateQuantity, applyPromo, removePromo, promoCode } = useCart()
  const [promoInput, setPromoInput] = useState("")

  const handleApplyPromo = () => {
    applyPromo(promoInput)
    setPromoInput("")
  }

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => onOpenChange(false)} />}

      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-700 transform transition-transform duration-300 z-50 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button onClick={() => onOpenChange(false)} className="p-2 hover:bg-gray-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-gray-800 rounded-lg p-3 space-y-2">
                <div className="flex gap-3">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover rounded"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-zpurple font-bold">${item.price}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-1 hover:bg-gray-700 rounded">
                    <Trash2 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-gray-700 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-2 py-1 bg-gray-700 rounded text-sm min-w-12 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-700 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="ml-auto text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-700 p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-zpink">
                  <span>Discount {promoCode && `(${promoCode})`}</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-700">
                <span>Total</span>
                <span className="text-gradient">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-zpurple"
                  disabled={!!promoCode}
                />
                {promoCode ? (
                  <button
                    onClick={() => removePromo()}
                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-xs font-semibold transition-colors"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={handleApplyPromo}
                    className="px-3 py-2 bg-zpurple hover:bg-zpurple/80 text-white rounded text-xs font-semibold transition-colors"
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>

            <Link href="/checkout" onClick={() => onOpenChange(false)}>
              <button className="btn-primary w-full">Checkout</button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
