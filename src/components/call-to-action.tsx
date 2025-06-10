import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <div className="bg-navy-blue py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Give Your Pet the Best?</h2>
        <p className="text-blue-100 max-w-2xl mx-auto mb-8">
          Join thousands of happy pet owners who trust our products for their furry friends.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-navy-blue hover:bg-gray-100">Shop Now</Button>
          <Button variant="outline" className="text-white border-white hover:bg-white/10">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}

