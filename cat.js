  {/* Filters Sidebar - Sticky within scroll container */}
  <AnimatePresence>
  {showfilters && (
      <motion.div 
          className="col-span-1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
      >
          <Card className="p-4 sticky top-4">
              <h2 className="font-bold mb-4">Metrics</h2>
              <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
              >
                  {['Orders', 'Gross sales', 'Discounts', 'Returns', 'Net sales', 'Shipping charges', 'Taxes'].map((item, index) => (
                      <motion.div 
                          key={item} 
                          className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                      >
                          {item}
                      </motion.div>
                  ))}
              </motion.div>
          </Card>
      </motion.div>
  )}
</AnimatePresence>