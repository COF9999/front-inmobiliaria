self.onmessage = async function (event) {
  const { baseUrlMachineLearningPublication, body } = event.data;

  try {
      const response = await fetch(`${baseUrlMachineLearningPublication}/knn/metric`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
      });

      const result = await response.json();

      if(response.status===404) throw new Error(result.match);

      if (!response.ok) throw new Error('Posible 500');

      
      self.postMessage({ success: true, result });
  } catch (error) {
      self.postMessage({ success: false, error: error.message });
  }
};




