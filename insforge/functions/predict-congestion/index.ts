import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// This edge function acts as our ML inference wrapper.
// In a real scenario, this would likely call a Python service running XGBoost/LSTM, or run a small quantized model in WASM.
// Here we mock the AI model returning a congestion prediction based on historical data.

serve(async (req) => {
  const { sensor_id, historical_data } = await req.json()

  console.log(`Analyzing streams for sensor: ${sensor_id}`)
  
  // Simulate LSTM/XGBoost inference latency
  await new Promise(r => setTimeout(r, 600))
  
  // Mock sophisticated prediction
  // For demonstration, predict an elevated congestion if historical_data trend is upwards
  let predicted_level = 0.4
  if (historical_data && historical_data.length > 0) {
     const lastItem = historical_data[historical_data.length - 1]
     predicted_level = Math.min(1.0, lastItem.level + 0.15)
  }

  const recommendations = []
  if (predicted_level > 0.6) {
      recommendations.push("Increase N-S green light duration by 15s")
      recommendations.push("Reroute heavy vehicles via Ring Road")
  }

  return new Response(
    JSON.stringify({ 
        predicted_level, 
        confidence: 0.89,
        model: "XGBoost-Ensemble-v2",
        recommendations 
    }),
    { headers: { "Content-Type": "application/json" } },
  )
})
