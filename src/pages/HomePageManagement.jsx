import { useState } from 'react';
import { Home, Image as ImageIcon, Save, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';

export function HomePageManagement() {
  const [heroTitle, setHeroTitle] = useState('Fresh Dairy Products Delivered Daily');
  const [heroSubtitle, setHeroSubtitle] = useState('Premium quality milk, paneer, and dairy products at your doorstep');
  const [showBanner, setShowBanner] = useState(true);
  const [bannerText, setBannerText] = useState('Get 20% off on your first order!');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2>Home Page Management</h2>
        <p className="text-muted-foreground">Customize your website's home page content</p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="banner">Promotional Banner</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card className="p-6">
            <h3 className="mb-4">Hero Section</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Hero Title</Label>
                <Input
                  id="hero-title"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder="Enter hero title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                <Textarea
                  id="hero-subtitle"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  placeholder="Enter hero subtitle"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Hero Background Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-3">
                    Click to upload or drag and drop
                  </p>
                  <Button variant="outline" size="sm">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Choose Image
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-red-500 hover:bg-red-600">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="banner">
          <Card className="p-6">
            <h3 className="mb-4">Promotional Banner</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Banner</Label>
                  <p className="text-sm text-muted-foreground">
                    Display promotional banner on home page
                  </p>
                </div>
                <Switch
                  checked={showBanner}
                  onCheckedChange={setShowBanner}
                />
              </div>

              {showBanner && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="banner-text">Banner Text</Label>
                    <Input
                      id="banner-text"
                      value={bannerText}
                      onChange={(e) => setBannerText(e.target.value)}
                      placeholder="Enter banner text"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Banner Color</Label>
                    <div className="flex gap-3">
                      <button className="h-10 w-10 rounded-lg bg-red-500 border-2 border-gray-300" />
                      <button className="h-10 w-10 rounded-lg bg-blue-500 border-2 border-transparent" />
                      <button className="h-10 w-10 rounded-lg bg-green-500 border-2 border-transparent" />
                      <button className="h-10 w-10 rounded-lg bg-yellow-500 border-2 border-transparent" />
                      <button className="h-10 w-10 rounded-lg bg-purple-500 border-2 border-transparent" />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end">
                <Button className="bg-red-500 hover:bg-red-600">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Feature Cards</h3>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>
            
            <div className="space-y-4">
              {['Fast Delivery', 'Fresh Products', '24/7 Support'].map((feature, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                  <div className="space-y-3">
                    <Input defaultValue={feature} placeholder="Feature title" />
                    <Textarea
                      placeholder="Feature description"
                      rows={2}
                      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <Button className="bg-red-500 hover:bg-red-600">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Customer Testimonials</h3>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </div>
            
            <div className="space-y-4">
              {['Rajesh Kumar', 'Priya Sharma'].map((customer, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                  <div className="space-y-3">
                    <Input defaultValue={customer} placeholder="Customer name" />
                    <Textarea
                      placeholder="Testimonial text"
                      rows={3}
                      defaultValue="Great service and fresh products! Highly recommended."
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <Button className="bg-red-500 hover:bg-red-600">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}